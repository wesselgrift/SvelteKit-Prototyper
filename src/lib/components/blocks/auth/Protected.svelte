<script>
	// Stores and navigation
	import { user, loading } from '$lib/stores/userStore';

	// Components
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import NoAccess from '$lib/components/blocks/auth/NoAccess.svelte';

	// Props
	let { children } = $props();
</script>

{#if $loading}
	<div role="status" class="flex h-screen flex-row items-center justify-center">
		<Spinner />
	</div>
{:else if !$loading && $user && $user.emailVerified}
	{@render children?.()}
{:else }
    <NoAccess />
{/if}
