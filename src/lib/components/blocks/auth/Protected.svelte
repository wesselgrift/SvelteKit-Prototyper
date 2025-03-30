<script>
	// Stores
	import { user, loading } from '$lib/stores/userStore';
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

	// Components
	import Spinner from '$lib/components/parts/Spinner.svelte';

	// Variables
	let { children } = $props();

    // Add/remove class when protected content is shown
	onMount(() => {
        if (browser) {
            document.body.classList.add('logged-in');
        }
	});
	
	onDestroy(() => {
        if (browser) {
            document.body.classList.remove('logged-in');
        }
	});
</script>

{#if $loading}
	<div role="status" class="flex h-screen flex-row items-center justify-center">
		<Spinner />
	</div>
{:else if !$loading && $user && $user.emailVerified}
	<div>
		{@render children?.()}
	</div>
{/if}
