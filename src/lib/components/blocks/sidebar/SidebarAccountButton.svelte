<script>
	// Auth, Navigation and stores
	import { userProfile } from '$lib/stores/userStore';
    import { logout } from '$lib/firebase/auth';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

	// Components
	import DropdownMenu from '$lib/components/blocks/dropdownmenu/DropdownMenu.svelte';
	import MenuItem from '$lib/components/blocks/dropdownmenu/MenuItem.svelte';
    import Avatar from '$lib/components/parts/Avatar.svelte';
    import Separator from '$lib/components/parts/Separator.svelte';
    import Modal from '$lib/components/parts/Modal.svelte';
    import Portal from '$lib/components/parts/Portal.svelte';
    import { Ellipsis, LogOut, Settings } from 'lucide-svelte';

    // Element states
    let accountPopup = $state(false);
    let accountPopupTrigger = $state();
    let settingsModal = $state(false);
    
	// Open & close profile menu
	function toggleAccountPopup(event) {
        event.stopPropagation();
        accountPopup = !accountPopup;
	}

    // Handle Logout
	async function handleLogout() {
        accountPopup = false
		await logout();
	}

    // Handle Settings
    function showSettings() {
        accountPopup = false;
        settingsModal = true;
    }

    const defaultClasses = 
    "-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 font-medium transition-all overflow-hidden bg-sidebar text-sidebar-foreground/50 hover:text-sidebar-foreground focus:text-sidebar-foreground hover-on-sidebar-background focus-ring";

    
</script>

{#if $userProfile.firstName}
    <!-- Account Menu Button -->
    <button bind:this={accountPopupTrigger} onclick={toggleAccountPopup} class={defaultClasses}>
        <div class="flex flex-row items-center justify-start gap-3 mr-4">
            <Avatar />
            {$userProfile.firstName}
        </div>
        <Ellipsis size={20} />
    </button>
{:else}
    <div class="h-12 block -m-2 bg-background animate-pulse rounded-lg"></div>
{/if}

<!-- Account Menu that opens when the button is clicked -->
{#if accountPopup }
	<DropdownMenu trigger={accountPopupTrigger} clickOutside={toggleAccountPopup} flyInFrom={10} classes="bottom-14 left-2 w-[calc(100%-1rem)]">
		<MenuItem disabled={true}>
            <span class="truncate">{$userProfile.email}</span>
        </MenuItem>
		<MenuItem onclick={showSettings}>
            <span class="truncate">Settings</span>
            <Settings size={18} />
        </MenuItem>
        <div class="px-3">
            <Separator />
        </div>
		<MenuItem onclick={handleLogout}>
            <span class="truncate">Log out</span>
            <LogOut size={18} />
        </MenuItem>
	</DropdownMenu>
{/if}

<!-- Settings modal -->
{#if settingsModal}
    <Portal target="settings-modal">
        <Modal title="Settings" closeAction={() => settingsModal = false}>
            <p class="text-muted-foreground mb-2">Signed in as:</p>
            <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
            <p class="mb-4">{$userProfile.email}</p>
        </Modal>
    </Portal>
{/if}