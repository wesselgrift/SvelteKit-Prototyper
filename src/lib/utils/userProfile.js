import { getDocument, setDocument } from "$lib/firebase/firestore";
import { userProfile } from "$lib/stores/userStore";

export async function setUserProfileData(user) {
    try {
        let userDoc = await getDocument("users", user.uid);
        
        // Create profile if it doesn't exist
        if (!userDoc) {
            const newProfile = {
                firstName: '',
                lastName: '',
                email: user.email,
                createdAt: new Date().toISOString()
            };
            
            await setDocument("users", user.uid, newProfile);
            userDoc = newProfile;
        }
        
        const profileData = {
            firstName: userDoc.firstName || '',
            lastName: userDoc.lastName || '',
            email: userDoc.email || user.email || ''
        };
        
        userProfile.set(profileData);
        
    } catch (error) {
        console.error('Error setting user profile:', error);
        // Set fallback profile
        userProfile.set({
            firstName: '',
            lastName: '',
            email: user?.email || ''
        });
    }
}