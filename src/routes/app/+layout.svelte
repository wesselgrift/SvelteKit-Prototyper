<script>
    // Components   
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
    import Modal from "$lib/components/parts/Modal.svelte";

    // Stores
    import { userProfile } from "$lib/stores/userStore";
    import { lockScroll, settingsModal } from "$lib/stores/uiStore";
    import { browser } from '$app/environment';

    // Lifecycle
    import { onMount, onDestroy } from "svelte";

    // Prop: children
    let { children } = $props();

    // Document objects for class manipulation
    let body;
    let html;

    // When the app layout is mounted add class to body and html
	onMount(() => {
        if (browser) {
            
            // Initialize document objects
            body = document.body;
            html = document.documentElement;

            // Add logged-in class to body and html
            body.classList.add('logged-in');
            html.classList.add('logged-in');
        }
	});

    // Update body and html class when lockScroll changes
    $effect(() => {
        if (browser) {
            if ($lockScroll) {
                // Add lock-scroll class to body and html
                body.classList.add('lock-scroll');
                html.classList.add('lock-scroll');
            } else {
                // Remove lock-scroll class from body and html
                body.classList.remove('lock-scroll');
                html.classList.remove('lock-scroll');
            }
        }
    });
	
    // When the app layout is destroyed remove classes from body and html
	onDestroy(() => {
        if (browser) {

            // Remove logged-in class from body and html
            body.classList.remove('logged-in');
            html.classList.remove('logged-in');

            // Remove lock-scroll class from body and html
            body.classList.remove('lock-scroll');
            html.classList.remove('lock-scroll');

            // Set scroll-lock to false on mount to prevent it 
            // from being open when the user logs back in
            $lockScroll = false;
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
            {#if $settingsModal}
                <Modal title="Settings" closeAction={() => $settingsModal = false}>
                    <p class="text-muted-foreground mb-2">Signed in as:</p>
                    <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
                    <p class="mb-4">{$userProfile.email}</p>
                </Modal>
            {/if}
        </div>
    </div>
</Protected>