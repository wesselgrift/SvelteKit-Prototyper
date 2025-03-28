import { writable } from "svelte/store";

// On auth state change user is set
// Loading is set to true when the auth state is being checked
export const user = writable(null);
export const loading = writable(true);

// User profile data, is filled on auth state change
export const userProfile = writable({});

// Modal visibility
export const settingsModal = writable(false);