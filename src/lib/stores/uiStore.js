import { writable } from "svelte/store";

// Scroll lock
export const lockScroll = writable(false);

// Modals
export const settingsModal = writable(false);

// Sidebar
export const viewSidebar = writable(false);