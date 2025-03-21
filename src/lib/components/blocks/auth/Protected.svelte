<script>
	// Svelte
	import { onDestroy } from 'svelte';

	// Stores
	import { user, loading } from '$lib/stores/userStore';

	// Components
	import Spinner from '$lib/components/parts/Spinner.svelte';

	// Variables
	let { children } = $props();
	let currentUser = $state();

	const unsubscribe = user.subscribe((val) => {
		currentUser = val;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if $loading}
	<div role="status" class="flex h-screen flex-row items-center justify-center">
		<Spinner />
	</div>
{:else if currentUser}
	<div>
		{@render children?.()}
	</div>
{/if}
