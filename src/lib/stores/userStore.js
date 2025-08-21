// Import the writable store function from Svelte
// Writable stores allow components to both read and update their values
import { writable } from "svelte/store";

/**
 * Loading state store - tracks whether the app is currently checking authentication status
 * 
 * This store is used to show loading indicators while:
 * - The app initializes and checks if a user is already signed in
 * - Authentication state changes are being processed
 * - User data is being fetched from Firebase
 * 
 * Initial value: true (because we start by checking auth state on app load)
 * Components can subscribe to this to show/hide loading spinners
 */
export const loading = writable(true);

/**
 * User profile store - contains the current user's profile information
 * 
 * This store holds user data like firstName, lastName, email, etc.
 * It gets populated when:
 * - A user successfully signs in
 * - User profile data is loaded from Firestore
 * - User updates their profile information
 * 
 * Initial value: {} (empty object when no user is signed in)
 * Components can subscribe to this to display user info in the UI
 * 
 * Example usage in a component:
 * import { userProfile } from '$lib/stores/userStore.js';
 * // In Svelte 5: const profile = $derived($userProfile);
 * // Then use: profile.firstName, profile.email, etc.
 */
export const userProfile = writable({});