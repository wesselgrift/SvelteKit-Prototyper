<script>
	import '$src/app.css';
	import { browser } from '$app/environment';
	import { initializeAuth } from '$lib/firebase/auth';

	let { children } = $props();

	if (browser) {
		initializeAuth();
	}
</script>

{@render children()}
