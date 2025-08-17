import { adminDb } from '$lib/server/firebase-admin';

// Helper to parse "John Doe" into firstName/lastName (only for Google users)
function parseDisplayName(displayName) {
    if (!displayName) return { firstName: '', lastName: '' };
    
    const parts = displayName.trim().split(' ');
    return {
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || ''
    };
}

export async function load({ locals }) {
    
    // Get or create user profile
    let userProfile;
    try {
        const userDoc = await adminDb.collection('users').doc(locals.user.uid).get();
        
        if (userDoc.exists) {
            // User exists - use their saved data
            const data = userDoc.data();
            userProfile = {
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || locals.user.email
            };
        } else {
            // New user (Google login) - parse displayName and create profile
            const { firstName, lastName } = parseDisplayName(locals.user.displayName);
            
            userProfile = {
                firstName,
                lastName,
                email: locals.user.email
            };
            
            // Create profile document for Google users
            await adminDb.collection('users').doc(locals.user.uid).set({
                firstName,
                lastName,
                email: locals.user.email,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    } catch (error) {
        console.error('Profile error:', error);
        // Fallback
        userProfile = {
            firstName: '',
            lastName: '',
            email: locals.user.email
        };
    }
    
    return {
        user: locals.user,
        userProfile
    };
}
