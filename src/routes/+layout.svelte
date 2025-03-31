<script>
	import '$src/app.scss';
	import { browser } from '$app/environment';
	import { initializeAuth } from '$lib/firebase/auth';

	let { children } = $props();

	if (browser) {
		initializeAuth();
	}
</script>

<div class="page-wrapper">
	{@render children()}
</div>

<style>
    .page-wrapper {
        position: relative;
        height: 100vh;
        width: 100vw;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
