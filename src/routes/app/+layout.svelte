<script>
    // Components   
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
    import Modal from "$lib/components/blocks/modal/Modal.svelte";

    // Stores
    import { userProfile } from "$lib/stores/userStore";
    import { viewSettings, viewSidebar } from "$lib/stores/uiStore";
    import { browser } from '$app/environment';

    // Lifecycle
    import { onMount, onDestroy } from "svelte";

    // Props & Derived
    let { children } = $props();
    let lockScroll = $derived($viewSettings || $viewSidebar);

    // When the app layout is mounted add class to body and html
	onMount(() => {
        if (browser) {
            document.body.classList.add('logged-in');
            document.documentElement.classList.add('logged-in');
        }
	});
	
    // When the app layout is destroyed remove classes from body and html
	onDestroy(() => {
        if (browser) {
            document.body.classList.remove('logged-in');
            document.documentElement.classList.remove('logged-in');
            document.body.classList.remove('lock-scroll');
            document.documentElement.classList.remove('lock-scroll');

            // Set modal and sidebar to false on mount to prevent them 
            // from being open when the user logs back in
            $viewSettings = false;
            $viewSidebar = false;
        }
	});

    // Close settings modal
    function closeSettingsModal() {
        $viewSettings = false;
    }

    // Update body and html class when lockScroll changes
    $effect(() => {
        if (browser) {
            if (lockScroll) {
                document.body.classList.add('lock-scroll');
                document.documentElement.classList.add('lock-scroll');
            } else {
                document.body.classList.remove('lock-scroll');
                document.documentElement.classList.remove('lock-scroll');
            }
        }
    });

</script>

<Protected>
    <div class="overflow-y-scroll md:overflow-auto h-dvh md:h-auto {lockScroll ? 'lock-scroll' : ''}">
        <div class="flex animate-fade-in">

            <!-- Sidebar -->
            <Sidebar />

            <!-- Main content, has margin left (md:ml-64) on sizes larger than md to account for sidebar -->
            <main class="flex-1 p-5 pt-[6rem] md:p-10 md:ml-64">
                {@render children()}
            </main>

            <!-- Settings modal -->
            {#if $viewSettings}
                <Modal title="Settings" closeModal={closeSettingsModal}>
                    <p class="text-muted-foreground mb-2">Signed in as:</p>
                    <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
                    <p class="mb-4">{$userProfile.email}</p>
                </Modal>
            {/if}
        </div>
    </div>
</Protected>