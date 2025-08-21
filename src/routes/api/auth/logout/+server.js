// Import SvelteKit utility for JSON responses
import { json } from '@sveltejs/kit';

// Server-side logout endpoint that clears the user's session
// This is a simple but secure way to log users out by removing their session cookie
export async function POST({ cookies }) {
    // Delete the session cookie that was set during login
    // The path: '/' ensures we delete the cookie from the same path it was set on
    // This immediately invalidates the user's session across the entire application
    cookies.delete('session', { path: '/' });
    
    // Return a success response to confirm logout completed
    // The client can use this to update UI state or redirect the user
    return json({ success: true });
}
