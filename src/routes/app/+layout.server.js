// Import Firebase Admin SDK to access Firestore database on the server side
import { adminDb } from '$lib/server/firebase-admin';

/**
 * Helper function to split a full display name into separate first and last names
 * This is primarily used for Google OAuth users who provide a "displayName" like "John Doe"
 * We need to break this down into individual firstName and lastName fields for our database
 */
function parseDisplayName(displayName) {
    // If no display name provided, return empty strings for both names
    if (!displayName) return { firstName: '', lastName: '' };
    
    // Split the display name by spaces (e.g., "John Doe Smith" becomes ["John", "Doe", "Smith"])
    const parts = displayName.trim().split(' ');
    return {
        // First part is always the first name
        firstName: parts[0] || '',
        // Everything after the first part becomes the last name (handles middle names too)
        lastName: parts.slice(1).join(' ') || ''
    };
}

/**
 * Server-side load function that runs before the /app layout renders
 * This function is responsible for:
 * 1. Fetching or creating user profile data from Firestore
 * 2. Making user data available to all pages within the /app section
 * 
 * The 'locals' object contains authenticated user data that was set in hooks.server.js
 */
export async function load({ locals }) {
    
    // Variable to store the user's profile information
    let userProfile;
    
    try {
        // Try to fetch the user's profile document from Firestore
        // Each user document is stored with their Firebase Auth UID as the document ID
        const userDoc = await adminDb.collection('users').doc(locals.user.uid).get();
        
        // Check if the user already has a profile document in our database
        if (userDoc.exists) {
            // Existing user - retrieve their saved profile data
            const data = userDoc.data();
            userProfile = {
                firstName: data.firstName || '', // Use saved firstName or empty string as fallback
                lastName: data.lastName || '',   // Use saved lastName or empty string as fallback
                email: data.email || locals.user.email // Prefer saved email, fallback to auth email
            };
        } else {
            // New user - this typically happens on first login, especially with Google OAuth
            // Parse their display name (if available) to extract first and last names
            const { firstName, lastName } = parseDisplayName(locals.user.displayName);
            
            // Create profile object with parsed names
            userProfile = {
                firstName,
                lastName,
                email: locals.user.email
            };
            
            // Create a new profile document in Firestore for this user
            // This ensures future visits will find an existing profile
            await adminDb.collection('users').doc(locals.user.uid).set({
                firstName,
                lastName,
                email: locals.user.email,
                createdAt: new Date(), // Track when the profile was created
                updatedAt: new Date()  // Track when it was last modified
            });
        }
    } catch (error) {
        // If anything goes wrong with the database operation, log the error
        console.error('Profile error:', error);
        
        // Provide a fallback profile with minimal data to prevent the app from breaking
        // At minimum, we can always provide the email from the authentication data
        userProfile = {
            firstName: '',
            lastName: '',
            email: locals.user.email
        };
    }
    
    // Return data that will be available to all pages and components within the /app layout
    // This data becomes accessible via the 'data' prop in Svelte components
    return {
        user: locals.user,        // Raw Firebase Auth user data (uid, email, emailVerified, etc.)
        userProfile               // Our custom user profile data (firstName, lastName, email)
    };
}
