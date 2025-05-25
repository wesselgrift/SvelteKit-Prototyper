<script>
	// Stores and navigation
	import { user, loading } from '$lib/stores/userStore';
    import { goto } from "$app/navigation";

	// Components
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import NoAccess from '$lib/components/blocks/auth/NoAccess.svelte';

	// Props
	let { children } = $props();

    // Functions
    function login() {
        goto('/login');
    }

    function signup() {
        goto('/account');
    }
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
