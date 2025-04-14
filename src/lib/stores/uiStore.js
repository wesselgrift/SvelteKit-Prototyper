import { writable } from "svelte/store";

// Scroll lock Items
export const lockedByModal = writable(false);
export const lockedBySidebar = writable(false);

// Modals
export const settingsModal = writable(false);

// Sidebar
export const viewSidebar = writable(false);