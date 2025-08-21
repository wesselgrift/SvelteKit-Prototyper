// Import the writable store function from Svelte
// These stores manage UI state that needs to be shared across multiple components
import { writable } from "svelte/store";

/**
 * Scroll lock store - controls whether the page body should be scrollable
 * 
 * When set to true, this prevents the user from scrolling the main page content.
 * This is commonly used when:
 * - Modal dialogs are open (prevents background scrolling)
 * - Mobile menus are displayed
 * - Overlay components need full user attention
 * 
 * Initial value: false (scrolling is enabled by default)
 * Components like Modal.svelte will set this to true when they open
 */
export const lockScroll = writable(false);

/**
 * Sidebar visibility store - controls whether the sidebar is currently visible
 * 
 * This manages the open/closed state of the main navigation sidebar.
 * Typically used for:
 * - Mobile responsive design (sidebar hidden by default on mobile)
 * - Desktop sidebar toggle functionality
 * - Coordinating sidebar state across different components
 * 
 * Initial value: false (sidebar is hidden by default)
 * Components can toggle this to show/hide the sidebar
 */
export const viewSidebar = writable(false);

/**
 * Portals store - manages portal containers for rendering components outside normal DOM flow
 * 
 * Portals allow you to render a component's content in a different part of the DOM tree
 * than where the component is defined. Common use cases:
 * - Modals that need to render at the document root (to avoid z-index issues)
 * - Tooltips that need to escape overflow:hidden containers
 * - Dropdown menus that need to appear above other content
 * 
 * Initial value: {} (empty object, portals are registered as needed)
 * The Portal.svelte component uses this to manage where content gets rendered
 */
export const portals = writable({});