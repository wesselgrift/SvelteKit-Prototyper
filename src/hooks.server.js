import { adminAuth } from '$lib/server/firebase-admin';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    const sessionCookie = event.cookies.get('session');
    
    console.log('🔍 Auth check for:', event.url.pathname);
    console.log('📄 Session cookie exists:', !!sessionCookie);
    
    if (sessionCookie) {
        try {
            const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
            event.locals.user = {
                uid: decodedClaims.uid,
                email: decodedClaims.email,
                emailVerified: decodedClaims.email_verified,
                displayName: decodedClaims.name || null
            };
            console.log('✅ Valid session for user:', decodedClaims.email);
        } catch (error) {
            console.log('❌ Invalid session cookie:', error.message);
            console.log('🗑️ Clearing invalid session cookie');
            // Clear invalid session
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        console.log('🚫 No session cookie found');
        event.locals.user = null;
    }
    
    const path = event.url.pathname;
    const user = event.locals.user;

    // Centralized route guards
    if (user && user.emailVerified) {
        // Verified users: redirect away from auth pages to app
        if (['/login', '/verify-email', '/account'].includes(path)) {
            console.log('🪧 Redirecting to /app');
            throw redirect(302, '/app');
        }
        // Redirect from root to app
        if (path === '/') {
            throw redirect(302, '/app');
        }
    } else if (user && !user.emailVerified) {
        // Unverified signed-in users: redirect to verify-email
        if (['/login', '/account'].includes(path)) {
            console.log('🪧 Redirecting to /verify-email');
            throw redirect(302, '/verify-email');
        }
    } else if (!user) {
        // No user at all: redirect protected pages to login
        if (['/app'].includes(path)) {
            console.log('🪧 Redirecting to /login');
            throw redirect(302, '/login');
        }
    }

    return resolve(event);
}