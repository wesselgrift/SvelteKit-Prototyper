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
import app from "$lib/firebase/firebase";
import { user, loading } from "$lib/stores/userStore";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let authInitialized = false;

export async function register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    
    return userCredential;
}

export async function sendVerificationEmail(user) {
    return await sendEmailVerification(user);
}

export async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get ID token and create server session
    const idToken = await userCredential.user.getIdToken();
    
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
    
    if (!response.ok) {
        throw new Error('Failed to create session');
    }
    
    // Force page reload to get new server state
    if (browser) {
        window.location.href = '/app';
    }
}

export async function loginWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Get ID token and create server session
    const idToken = await userCredential.user.getIdToken();
    
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
    
    if (!response.ok) {
        throw new Error('Failed to create session');
    }
    
    // Force page reload to get new server state
    if (browser) {
        window.location.href = '/app';
    }
}

export async function logout() {
    // Sign out from Firebase client
    await firebaseSignOut(auth);
    
    // Clear server session
    await fetch('/api/auth/logout', { method: 'POST' });
    
    // Redirect to login
    if (browser) {
        window.location.href = '/login';
    }
}

export async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
}

// Simplified auth state - mainly for loading states now
export function initializeAuth() {
    if (authInitialized) return;
    authInitialized = true;
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        // We don't use this for auth decisions anymore, just loading states
        loading.set(false);
    });
    
    return () => {
        if (unsubscribe) {
            unsubscribe();
            authInitialized = false;
        }
    };
}

export default auth;