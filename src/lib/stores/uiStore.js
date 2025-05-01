import { writable } from "svelte/store";

// Scroll lock
export const lockScroll = writable(false);

// Sidebar
export const viewSidebar = writable(false);

// Portals
export const portals = writable({});