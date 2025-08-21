// Import Firebase Auth functions for client-side authentication
// These handle user registration, login, logout, and authentication state
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut as firebaseSignOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth";

// Import our Firebase app configuration
import app from "$lib/firebase/firebase";

// Import loading state store to manage UI loading indicators
import { loading } from "$lib/stores/userStore";

// Import browser check to ensure certain code only runs client-side
import { browser } from "$app/environment";

// Initialize Firebase Auth instance using our app configuration
const auth = getAuth(app);

// Set up Google OAuth provider for "Continue with Google" functionality
const googleProvider = new GoogleAuthProvider();

// Track whether auth state listener has been set up (prevents duplicate listeners)
let authInitialized = false;

/**
 * Register a new user with email and password
 * 
 * This function:
 * 1. Creates a new Firebase Auth account
 * 2. Automatically sends an email verification to the user
 * 3. Returns the user credential for further processing
 * 
 * After registration, users need to verify their email before accessing the app
 */
export async function register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Automatically send verification email to new users
    // They'll need to click the link in their email to verify their account
    await sendEmailVerification(userCredential.user);
    
    return userCredential;
}

/**
 * Resend email verification to a user
 * 
 * This is used when users need to verify their email but didn't receive
 * the initial verification email or it expired
 */
export async function sendVerificationEmail(user) {
    return await sendEmailVerification(user);
}

/**
 * Sign in a user with email and password
 * 
 * This function handles the complete login flow:
 * 1. Authenticates with Firebase Auth
 * 2. Creates a server-side session cookie
 * 3. Redirects user based on their email verification status
 * 
 * Verified users go to /app, unverified users go to /verify-email
 */
export async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get the user's ID token - this proves they're authenticated
    // We send this to our server to create a session cookie
    const idToken = await userCredential.user.getIdToken();
    
    // Call our server endpoint to create a session cookie
    // This allows the server to know the user is authenticated on future requests
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
    
    if (!response.ok) {
        throw new Error('Failed to create session');
    }
    
    // Redirect user based on whether they've verified their email
    // Only run navigation code in the browser (not during SSR)
    if (browser) {
        const { goto } = await import('$app/navigation');
        if (userCredential.user?.emailVerified) {
            await goto('/app'); // Verified users can access the main app
        } else {
            await goto('/verify-email'); // Unverified users must verify first
        }
    }
}

/**
 * Sign in a user with Google OAuth
 * 
 * This function:
 * 1. Opens Google's OAuth popup for user to select their Google account
 * 2. Creates a server-side session cookie
 * 3. Redirects based on email verification status
 * 
 * Note: Google accounts are usually pre-verified, but we still check
 */
export async function loginWithGoogle() {
    // Opens a popup window for Google OAuth sign-in
    // User selects their Google account and grants permissions
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Get the user's ID token to prove they're authenticated
    const idToken = await userCredential.user.getIdToken();
    
    // Create server-side session cookie (same process as email/password login)
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
    
    if (!response.ok) {
        throw new Error('Failed to create session');
    }
    
    // Redirect based on email verification status
    // Google accounts are typically already verified, but we check anyway
    if (browser) {
        const { goto } = await import('$app/navigation');
        if (userCredential.user?.emailVerified) {
            await goto('/app');
        } else {
            await goto('/verify-email');
        }
    }
}

/**
 * Sign out the current user
 * 
 * This function handles complete logout:
 * 1. Signs out from Firebase Auth (clears client-side authentication)
 * 2. Clears the server-side session cookie
 * 3. Redirects to the specified page (default: /login)
 * 
 * Even if some steps fail, we always redirect to ensure user sees logged out state
 */
export async function logout(redirectTo = '/login') {
    try {
        // Sign out from Firebase Auth - clears client-side authentication state
        await firebaseSignOut(auth);
        
        // Clear the server-side session cookie by calling our logout endpoint
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        
        if (!response.ok) {
            console.error('Server logout failed, but continuing...');
        }
        
    } catch (error) {
        console.error('Logout error:', error);
        // Continue with redirect even if logout partially fails
        // Better to show logged out state than leave user stuck
    } finally {
        // Always redirect at the end, regardless of any errors above
        // This ensures user sees the logged out state
        if (browser) {
            const { goto } = await import('$app/navigation');
            await goto(redirectTo);
        }
    }
}

/**
 * Ensure the server has a valid session cookie for the current user
 * 
 * This function is used to sync client-side authentication with server-side sessions.
 * It's called when:
 * - The app loads and detects a signed-in user
 * - We need to ensure server knows about the authenticated user
 * - Session cookies might have expired but client auth is still valid
 * 
 * Only runs in the browser and only if a user is currently signed in
 */
export async function ensureServerSession() {
    // Only run this code in the browser (not during server-side rendering)
    if (!browser) return;
    
    // Get the currently signed-in user (if any)
    const user = auth.currentUser;
    if (!user) return; // No user signed in, nothing to sync
    
    // Get a fresh ID token (force refresh with true parameter)
    const idToken = await user.getIdToken(true);
    
    // Send the token to our server to create/refresh the session cookie
    await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
}

/**
 * Send a password reset email to the user
 * 
 * This triggers Firebase to send an email with a link that allows
 * the user to reset their password. Used on the /reset-password page.
 */
export async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
}

/**
 * Initialize authentication state listener
 * 
 * This sets up a listener that monitors Firebase Auth state changes.
 * Currently, it's primarily used to manage loading states:
 * - When auth state is determined (user signed in or not), loading is set to false
 * - This allows the UI to stop showing loading spinners
 * 
 * Note: We don't use this listener for routing decisions anymore.
 * Authentication routing is handled by server-side hooks and guards.
 * 
 * Returns a cleanup function to remove the listener when no longer needed.
 */
export function initializeAuth() {
    // Prevent setting up multiple listeners
    if (authInitialized) return;
    authInitialized = true;
    
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        // We don't use this for auth decisions anymore, just loading states
        // Once we know the auth state (signed in or not), stop showing loading
        loading.set(false);
    });
    
    // Return cleanup function to remove the listener
    return () => {
        if (unsubscribe) {
            unsubscribe();
            authInitialized = false;
        }
    };
}

// Export the auth instance for direct use in other modules if needed
export default auth;