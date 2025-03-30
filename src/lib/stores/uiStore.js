import { writable } from "svelte/store";

// Modal visibility
export const viewSettings = writable(false);

// Sidebar visibility
export const viewSidebar = writable(false);