import { writable } from "svelte/store";

// Modal visibility
export const settingsModal = writable(false);

// Account Menu visibility
export const accountPopup = writable(false);