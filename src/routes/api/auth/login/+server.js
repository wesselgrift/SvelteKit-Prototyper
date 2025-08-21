// Import SvelteKit utilities and Firebase Admin SDK
import { json } from '@sveltejs/kit';
import { adminAuth } from '$lib/server/firebase-admin';

// Server-side login endpoint that creates secure session cookies
// This runs on the server and handles the exchange of Firebase ID tokens for session cookies
export async function POST({ request, cookies }) {
    try {
        // Extract the Firebase ID token from the request body
        // This token was generated on the client after successful Firebase authentication
        const { idToken } = await request.json();
        
        // Validate that an ID token was provided
        if (!idToken) {
            return json({ error: 'ID token required' }, { status: 400 });
        }
        
        // Verify the ID token using Firebase Admin SDK
        // This ensures the token is valid, not expired, and came from our Firebase project
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        
        // Create a secure session cookie that expires in 5 days
        // Session cookies are more secure than storing tokens in localStorage
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        
        // Set the session cookie with security best practices
        cookies.set('session', sessionCookie, {
            maxAge: 60 * 60 * 24 * 5,                    // 5 days in seconds (browser expiry)
            httpOnly: true,                              // Prevents JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',                          // CSRF protection
            path: '/'                                    // Available across the entire site
        });
        
        // Return success response with essential user information
        // This data can be used by the client without storing sensitive tokens
        return json({ 
            success: true, 
            user: {
                uid: decodedToken.uid,                   // Unique user identifier
                email: decodedToken.email,               // User's email address
                emailVerified: decodedToken.email_verified // Email verification status
            }
        });
        
    } catch (error) {
        // Log the full error for server debugging
        console.error('Login error:', error);
        
        // Return generic error message to client for security
        // Don't expose internal error details that could help attackers
        return json({ error: 'Authentication failed' }, { status: 401 });
    }
}
