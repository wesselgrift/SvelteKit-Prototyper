<script>
	// Svelte, Auth and user store
    import { userProfile } from "$lib/stores/userStore";

	// Components
    import Logo from '$lib/components/parts/Logo.svelte';
    import SidebarAccountButton from '$lib/components/blocks/sidebar/SidebarAccountButton.svelte';
    import SidebarContent from '$lib/components/blocks/sidebar/SidebarContent.svelte';

</script>

<div class="w-64 flex flex-col h-screen justify-between items-start bg-sidebar">
    <div class="block w-full p-4">
       <Logo/>
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <SidebarContent/>
    </div>
    <div class="w-full flex flex-col p-4 relative">
        {#if $userProfile.firstName}
            <SidebarAccountButton/>
        {:else}
            <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
        {/if}
    </div>
</div>