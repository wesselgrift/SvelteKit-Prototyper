<script>
	// Import UI store to control sidebar visibility state
    import { viewSidebar } from "$lib/stores/uiStore";

	// Import sidebar-related components
    import Logo from '$lib/components/parts/Logo/Logo.svelte';
    import AccountButton from '$lib/components/parts/Sidebar/AccountButton.svelte';
    import Content from '$lib/components/parts/Sidebar/Content.svelte';
    import Button from '$lib/components/parts/Button/Button.svelte';
    import { PanelRight } from "lucide-svelte";

    // Function to hide the sidebar (used by backdrop and close button)
    function closeSidebar() {
        $viewSidebar = false;
    }
</script>

<!-- Mobile-only backdrop overlay that appears behind the sidebar -->
{#if $viewSidebar}
    <!-- Semi-transparent overlay that covers the screen and closes sidebar when clicked -->
    <div role="presentation" class="fixed block md:hidden left-0 top-0 flex h-dvh w-full bg-sidebar/80 justify-center items-center z-30" onclick={closeSidebar}>
    </div>
{/if}

<!-- Main sidebar container with responsive behavior -->
<div class="sidebar flex flex-col fixed top-0 -left-64 {$viewSidebar ? 'left-0' : ' '} md:left-0 w-64 h-dvh justify-between items-start bg-sidebar transition-all duration-300 z-40">
    
    <!-- Sidebar header with logo and mobile close button -->
    <div class="flex justify-between items-center w-full p-4">
       <Logo/>
        <!-- Close button - only visible on mobile -->
        <span role="presentation" class="block md:hidden">
            <Button variant="ghost" size="icon" width="hug" onclick={closeSidebar}>
                <PanelRight size={20} />
            </Button>
        </span>
    </div>    
    
    <!-- Main sidebar content area (navigation links, etc.) -->
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <Content/>
    </div>
    
    <!-- Sidebar footer with account/user information -->
    <div class="w-full flex flex-col p-4 relative">
        <AccountButton/>
    </div>
</div>