<script>
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
    import Modal from "$lib/components/blocks/modal/Modal.svelte";
    import { userProfile } from "$lib/stores/userStore";
    import { viewSettings } from "$lib/stores/uiStore";
	
    let { children } = $props();

    function closeSettingsModal() {
        $viewSettings = false;
    }

</script>

<Protected>
    <div class="flex animate-fade-in">
        <Sidebar />
        <main class="flex-1 p-5 md:p-10 overflow-y-scroll max-h-screen">
            {@render children()}
        </main>
        {#if $viewSettings}
            <Modal title="Settings" closeModal={closeSettingsModal}>
                <p class="text-muted-foreground mb-2">Signed in as:</p>
                <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
                <p class="mb-4">{$userProfile.email}</p>
            </Modal>
        {/if}
    </div>
</Protected>