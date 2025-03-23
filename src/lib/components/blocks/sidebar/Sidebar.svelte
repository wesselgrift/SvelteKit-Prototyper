<script>
	// Svelte, Auth and user store
    import { logout } from "$lib/firebase/auth";
    import { userProfile } from "$lib/stores/userStore";

	// Components
    import Logo from '$lib/components/parts/Logo.svelte';
    import SidebarAccountButton from '$lib/components/blocks/sidebar/SidebarAccountButton.svelte';
    import SidebarContent from '$lib/components/blocks/sidebar/SidebarContent.svelte';
    import Separator from '$lib/components/parts/Separator.svelte';
    import { LogOut } from "lucide-svelte";

    async function handleLogout() {
        await logout();
    }

    function openSidebarMenu() {
        console.log('openSidebarMenu');
    }
</script>

<div class="flex flex-col h-screen justify-between items-center py-0">
    <div class="block w-full p-4">
       <Logo/>
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <SidebarContent/>
    </div>
    <div class="w-full flex flex-col p-4 relative">
        {#if $userProfile.firstName}
            <SidebarAccountButton onclick={openSidebarMenu}/>
            
            <!-- Menu -->
            <div class="flex flex-col gap-1 w-[calc(100%-1rem)] rounded-xl bg-color-background border-color-border border shadow-md absolute left-2 bottom-12 mb-2 p-1 z-10">
                
                <!-- Menu links -->
                <span class="py-2 px-3 w-full flex items-center justify-between gap-2 rounded-lg text-color-muted-foreground">
                    {$userProfile.email}
                </span>

                <span class="py-2 px-3 w-full flex items-center justify-between gap-2 transition rounded-lg cursor-pointer hover:bg-color-accent active:bg-color-accent-hover">
                    Settings
                </span>

                <!-- Separator -->
                <div class="px-3"><Separator /></div>

                <!-- Logout button -->
                <button class="py-2 px-3 w-full flex items-center justify-between gap-2 transition rounded-lg cursor-pointer hover:bg-color-accent active:bg-color-accent-hover" onclick={handleLogout}>
                    Uitloggen
                    <LogOut size={18} strokeWidth={2} />
                </button>
            </div>
            <!-- End menu -->

        {:else}
            <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
        {/if}
    </div>
</div>