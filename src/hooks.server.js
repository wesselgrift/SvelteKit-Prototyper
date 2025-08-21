// Import Firebase Admin SDK for server-side authentication verification
import { adminAuth } from '$lib/server/firebase-admin';
// Import SvelteKit's redirect function to send users to different pages
import { redirect } from '@sveltejs/kit';

// This is a SvelteKit server hook that runs on EVERY request before any page loads
// It handles authentication and controls which pages users can access
export async function handle({ event, resolve }) {
    // Try to get the session cookie that was set when the user logged in
    const sessionCookie = event.cookies.get('session');
    
    // If we found a session cookie, verify it's valid
    if (sessionCookie) {
        try {
            // Ask Firebase to verify the session cookie is real and not expired
            const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
            
            // If valid, store the user info in event.locals so other parts of the app can use it
            event.locals.user = {
                uid: decodedClaims.uid,                           // Unique user ID
                email: decodedClaims.email,                       // User's email address
                emailVerified: decodedClaims.email_verified,      // Whether they've verified their email
                displayName: decodedClaims.name || null           // Their display name (if they have one)
            };
        } catch (error) {
            // If the session cookie is invalid/expired, remove it and mark user as not logged in
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        // No session cookie found, so user is not logged in
        event.locals.user = null;
    }
    
    // Get the current page path (like '/app', '/login', etc.)
    const path = event.url.pathname;
    // Get the user info we just set up above
    const user = event.locals.user;

    // Don't apply route guards to API endpoints - let them handle their own auth
    if (path.startsWith('/api')) {
        return resolve(event);
    }

    // ROUTE GUARDS: Control who can access what pages based on their authentication status
    
    if (user && user.emailVerified) {
        // User is logged in AND has verified their email
        // They should only be able to access the app pages
        if (!path.startsWith('/app')) {
            // If they try to go anywhere else (like /login), redirect them to the app
            throw redirect(302, '/app');
        }
    } else if (user && !user.emailVerified) {
        // User is logged in but hasn't verified their email yet
        // They can ONLY access the email verification page
        if (path !== '/verify-email') {
            // If they try to go anywhere else, send them to verify their email
            throw redirect(302, '/verify-email');
        }
    } else {
        // User is NOT logged in at all
        
        // These are the pages that non-logged-in users are allowed to see
        const publicPaths = ['/', '/login', '/account', '/reset-password'];
        
        // If they try to access pages that require authentication, send them to login
        if (path === '/verify-email' || path.startsWith('/app')) {
            throw redirect(302, '/login');
        }
        
        // If they try to access any other page not in our public list, send them to login
        if (!publicPaths.includes(path)) {
            throw redirect(302, '/login');
        }
    }

    // If we made it here, the user is allowed to access this page
    // Continue with the normal page rendering process
    return resolve(event);
}