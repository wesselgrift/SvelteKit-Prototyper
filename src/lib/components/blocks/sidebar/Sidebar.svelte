<script>
	// Svelte, Auth and user store
    import { logout } from "$lib/firebase/auth";
    import { userProfile } from "$lib/stores/userStore";

	// Components
    import Logo from '$lib/components/parts/Logo.svelte';
    import { AccountButton } from '$lib/components/blocks/sidebar/AccountButton.svelte';
    import { SidebarContent } from '$lib/components/blocks/sidebar/SidebarContent.svelte';

    async function handleLogout() {
        await logout();
    }
</script>

<div class="flex flex-col h-screen justify-between items-center py-0">
    <div class="block w-full p-4">
       <Logo/>
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <SidebarContent/>
    </div>
    <div class="w-full flex flex-col p-4">
        {#if $userProfile.firstName}
            <AccountButton onclick={handleLogout}/>
        {:else}
            <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
        {/if}
    </div>
</div>