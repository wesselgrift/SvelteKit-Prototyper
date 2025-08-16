import { adminAuth } from '$lib/server/firebase-admin';

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
    
    return resolve(event);
}