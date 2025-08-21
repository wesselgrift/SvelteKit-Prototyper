<script>
	// Import global styles that apply to the entire application
	import '$src/app.scss';
	
	// Import SvelteKit utilities
	import { browser } from '$app/environment';

	// Get the children prop which contains the page content to render
	let { children } = $props();

	// Initialize Firebase authentication only in the browser (not during SSR)
	// Use dynamic import to avoid SSR importing client SDK
	if (browser) {
		import('$lib/firebase/auth').then((m) => m.initializeAuth());
	}
</script>

<!-- Root layout that wraps all pages in the application -->
<!-- The children prop contains the specific page content for each route -->
{@render children()}