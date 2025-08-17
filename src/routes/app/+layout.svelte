<script>
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
    import Portal from "$lib/components/parts/Portal.svelte";
    
    import { lockScroll } from "$lib/stores/uiStore";
    import { userProfile } from "$lib/stores/userStore"; // Import the store
    import { browser } from '$app/environment';
    import { bodyClassUpdater } from "$lib/utils/bodyClassUpdater";
    import { onMount, onDestroy } from "svelte";

    let { children, data } = $props();
    
    // Server-provided user data
    const { user, userProfile: serverUserProfile } = data;
    
    // Populate userProfile store with server data
    $effect(() => {
        userProfile.set(serverUserProfile);
    });

    onMount(() => {
        if (browser) {
            bodyClassUpdater(true, 'logged-in');
        }
    });

    $effect(() => {
        if (browser) {
            bodyClassUpdater($lockScroll, 'lock-scroll');
        }
    });
    
    onDestroy(() => {
        if (browser) {
            bodyClassUpdater(false, 'logged-in');
            bodyClassUpdater(false, 'lock-scroll');
        }
    });
</script>

<div class="overflow-y-scroll md:overflow-auto h-dvh md:h-auto {$lockScroll ? 'lock-scroll' : ''}">
    <div class="flex animate-fade-in">
        <Sidebar {user} />
        
        <main class="flex-1 p-5 pt-[6rem] md:p-10 md:ml-64">
            {@render children()}
        </main>

        <Portal name="example-modal"/>
        <Portal name="settings-modal"/>
    </div>
</div>