<script>
	// Stores
	import { user, loading } from '$lib/stores/userStore';

	// Components
	import Spinner from '$lib/components/parts/Spinner.svelte';

	// Props
	let { children } = $props();

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
