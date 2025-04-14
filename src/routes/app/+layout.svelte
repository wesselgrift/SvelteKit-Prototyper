<script>
    // Components   
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
    import Modal from "$lib/components/parts/Modal.svelte";

    // Stores
    import { userProfile } from "$lib/stores/userStore";
    import { lockScroll, settingsModal, exampleModal } from "$lib/stores/uiStore";
    import { browser } from '$app/environment';

    // Utils
    import { bodyClassUpdater } from "$lib/utils/bodyClassUpdater";

    // Lifecycle
    import { onMount, onDestroy } from "svelte";

    // Prop: children
    let { children } = $props();

    // When the app layout is mounted add class to body and html
	onMount(() => {
        if (browser) {
            // Add logged-in class to body and html
            bodyClassUpdater(true, 'logged-in');
        }
	});

    // Update body and html class when lockScroll changes
    $effect(() => {
        if (browser) {
            bodyClassUpdater($lockScroll, 'lock-scroll');
        }
    });
	
    // When the app layout is destroyed remove classes from body and html
	onDestroy(() => {
        if (browser) {
            // Remove logged-in and lock-scroll classes from body and html
            bodyClassUpdater(false, 'logged-in');
            bodyClassUpdater(false, 'lock-scroll');
        }
	});

</script>

<Protected>
    <div class="overflow-y-scroll md:overflow-auto h-dvh md:h-auto {$lockScroll ? 'lock-scroll' : ''}">
        <div class="flex animate-fade-in">

            <!-- Sidebar -->
            <Sidebar />

            <!-- Main content, has margin left (md:ml-64) on sizes larger than md to account for sidebar -->
            <main class="flex-1 p-5 pt-[6rem] md:p-10 md:ml-64">
                {@render children()}
            </main>

            <!-- Settings modal -->
            {#if $settingsModal}
                <Modal title="Settings" closeAction={() => $settingsModal = false}>
                    <p class="text-muted-foreground mb-2">Signed in as:</p>
                    <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
                    <p class="mb-4">{$userProfile.email}</p>
                </Modal>
            {/if}

            <!-- Example modal -->
            {#if $exampleModal}
                <Modal title="Example modal" closeAction={() => $exampleModal = false}>
                    <p>This is an example modal</p>
                </Modal>
            {/if}
        </div>
    </div>
</Protected>