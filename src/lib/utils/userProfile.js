import { getDocument } from "$lib/firebase/firestore";
import { userProfile } from "$lib/stores/userStore";

// Get the user profile data from the database with the user id
export async function setUserProfileData(user) {
    const userDoc = await getDocument("users", user.uid);

    let profileArray = {
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
    }

    userProfile.set(profileArray)
}