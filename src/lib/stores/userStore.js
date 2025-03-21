import { writable } from "svelte/store";

export const user = writable(null);
export const loading = writable(true);

// User profile data, is filled on auth state change
export const firstName = writable('');
export const lastName = writable('');
export const userEmail = writable('');