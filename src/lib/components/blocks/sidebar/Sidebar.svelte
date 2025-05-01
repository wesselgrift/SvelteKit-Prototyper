<script>
	// Svelte, Auth and user store
    import { viewSidebar } from "$lib/stores/uiStore";

	// Components
    import Logo from '$lib/components/parts/Logo.svelte';
    import SidebarAccountButton from '$lib/components/blocks/sidebar/SidebarAccountButton.svelte';
    import SidebarContent from '$lib/components/blocks/sidebar/SidebarContent.svelte';
    import Button from '$lib/components/parts/Button.svelte';
    import { PanelRight } from "lucide-svelte";

    // Toggle sidebar
    function closeSidebar() {
        $viewSidebar = false;
    }
</script>

<!-- Backdrop -->
{#if $viewSidebar}
    <div role="presentation" class="fixed block md:hidden left-0 top-0 flex h-dvh w-full bg-sidebar/80 justify-center items-center z-30" onclick={closeSidebar}>
    </div>
{/if}

<!-- Sidebar -->
<div class="sidebar flex flex-col fixed top-0 -left-64 {$viewSidebar ? 'left-0' : ' '} md:left-0 w-64 h-dvh justify-between items-start bg-sidebar transition-all duration-300 z-40">
    <div class="flex justify-between items-center w-full p-4">
       <Logo/>
        <span role="presentation" class="block md:hidden">
            <Button variant="ghost" size="icon" width="hug" onclick={closeSidebar}><PanelRight size={20} /></Button>
        </span>
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <SidebarContent/>
    </div>
    <div class="w-full flex flex-col p-4 relative">
        <SidebarAccountButton/>
    </div>
</div>