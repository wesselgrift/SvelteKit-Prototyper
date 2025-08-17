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
            console.log('📨 Email verified:', decodedClaims.email_verified);
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

    // Skip API routes
    if (path.startsWith('/api')) {
        return resolve(event);
    }

    // Centralized route guards (reworked per access rules)
    if (user && user.emailVerified) {
        // Logged-in and email verified: only allow /app and its subpages
        if (!path.startsWith('/app')) {
            console.log('🪧 Verified user redirected to /app');
            throw redirect(302, '/app');
        }
    } else if (user && !user.emailVerified) {
        // Logged-in but email unverified: only allow /verify-email
        if (path !== '/verify-email') {
            console.log('🪧 Unverified user redirected to /verify-email');
            throw redirect(302, '/verify-email');
        }
    } else {
        // Non-logged-in users
        const publicPaths = ['/', '/login', '/account', '/reset-password'];
        if (path === '/verify-email' || path.startsWith('/app')) {
            console.log('🪧 Anonymous user redirected to /login');
            throw redirect(302, '/login');
        }
        if (!publicPaths.includes(path)) {
            console.log('🪧 Anonymous user redirected to /login');
            throw redirect(302, '/login');
        }
    }

    return resolve(event);
}