import { getDocument } from "$lib/firebase/firestore";
import { firstName, lastName, userEmail } from "$lib/stores/userStore";

// Get the user profile data from the database with the user id
export async function setUserProfileData(user) {
    const userDoc = await getDocument("users", user.uid);
    firstName.set(userDoc.firstName);
    lastName.set(userDoc.lastName);
    userEmail.set(userDoc.email);
}