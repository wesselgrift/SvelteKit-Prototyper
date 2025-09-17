<script>
    // Import layout components and utilities
    import Sidebar from "$lib/components/parts/Sidebar/Sidebar.svelte";
    import Portal from "$lib/components/parts/Portal/Portal.svelte";
    
    // Import stores and utilities for UI state management
    import { lockScroll } from "$lib/stores/uiStore";
    import { userProfile } from "$lib/stores/userStore"; // Import the store
    import { browser } from '$app/environment';
    import { bodyClassUpdater } from "$lib/utils/bodyClassUpdater";
    import { onMount, onDestroy } from "svelte";

    // Get page content and server data
    let { children, data } = $props();
    
    // Extract user data from server-side load function
    const { user, userProfile: serverUserProfile } = data;
    
    // Sync server user data with client-side store
    $effect(() => {
        userProfile.set(serverUserProfile);
    });

    // Add logged-in class to body when layout mounts
    onMount(() => {
        if (browser) {
            bodyClassUpdater(true, 'logged-in');
        }
    });

    // Update body class based on scroll lock state
    $effect(() => {
        if (browser) {
            bodyClassUpdater($lockScroll, 'lock-scroll');
        }
    });
    
    // Clean up body classes when layout unmounts
    onDestroy(() => {
        if (browser) {
            bodyClassUpdater(false, 'logged-in');
            bodyClassUpdater(false, 'lock-scroll');
        }
    });
</script>

<!-- Main app layout with sidebar and content area -->
<div class="overflow-y-scroll md:overflow-auto h-dvh md:h-auto {$lockScroll ? 'lock-scroll' : ''}">
    <div class="flex animate-fade-in">
        <!-- Navigation sidebar -->
        <Sidebar {user} />
        
        <!-- Main content area -->
        <main class="flex-1 p-5 pt-[6rem] md:p-10 md:ml-64">
            {@render children()}
        </main>

        <!-- Portal targets for modals -->
        <Portal name="example-modal"/>
        <Portal name="settings-modal"/>
    </div>
</div>