import { json } from '@sveltejs/kit';
import { adminAuth } from '$lib/server/firebase-admin';

export async function POST({ request, cookies }) {
    try {
        const { idToken } = await request.json();
        
        if (!idToken) {
            return json({ error: 'ID token required' }, { status: 400 });
        }
        
        // Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        
        // Create session cookie (expires in 5 days)
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        
        // Set secure cookie
        cookies.set('session', sessionCookie, {
            maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        
        return json({ 
            success: true, 
            user: {
                uid: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return json({ error: 'Authentication failed' }, { status: 401 });
    }
}
