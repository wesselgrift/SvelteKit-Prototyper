<script>
	// Import global styles that apply to the entire application
	import '$src/app.scss';
	
	// Import SvelteKit utilities and Firebase auth initialization
	import { browser } from '$app/environment';
	import { initializeAuth } from '$lib/firebase/auth';

	// Get the children prop which contains the page content to render
	let { children } = $props();

	// Initialize Firebase authentication only in the browser (not during SSR)
	// This sets up auth state listeners and handles automatic login/logout
	if (browser) {
		initializeAuth();
	}
</script>

<!-- Root layout that wraps all pages in the application -->
<!-- The children prop contains the specific page content for each route -->
{@render children()}