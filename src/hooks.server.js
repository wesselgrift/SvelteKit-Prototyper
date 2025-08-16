import { adminAuth } from '$lib/server/firebase-admin';

export async function handle({ event, resolve }) {
    const sessionCookie = event.cookies.get('session');
    
    if (sessionCookie) {
        try {
            const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
            event.locals.user = {
                uid: decodedClaims.uid,
                email: decodedClaims.email,
                emailVerified: decodedClaims.email_verified,
                displayName: decodedClaims.name || null
            };
        } catch (error) {
            console.log('Invalid session cookie:', error.message);
            // Clear invalid session
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }
    
    return resolve(event);
}