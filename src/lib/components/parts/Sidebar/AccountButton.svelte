<script>
	// Import user data and authentication functions
	import { userProfile } from '$lib/stores/userStore';
    // import { logout } from '$lib/firebase/auth';

	// Import UI components for account menu and modal
	import Dropdown from '$lib/components/parts/Dropdown/Dropdown.svelte';
	import MenuItem from '$lib/components/parts/Dropdown/MenuItem.svelte';
    import Avatar from '$lib/components/parts/Avatar/Avatar.svelte';
    import Separator from '$lib/components/parts/Separator/Separator.svelte';
    import Modal from '$lib/components/parts/Modal/Modal.svelte';
    import Portal from '$lib/components/parts/Portal/Portal.svelte';
    import { Ellipsis, LogOut, Settings } from 'lucide-svelte';

    // Component state for UI interactions
    let accountPopup = $state(false);       // Controls dropdown menu visibility
    let accountPopupTrigger = $state();     // Reference to button element for positioning dropdown
    let settingsModal = $state(false);      // Controls settings modal visibility
    
	// Toggle the account dropdown menu open/closed
	function toggleAccountPopup(event) {
        event.stopPropagation();  // Prevent event bubbling to document click handlers
        accountPopup = !accountPopup;
	}

    // Handle user logout - close menu and sign out
	async function handleLogout() {
        accountPopup = false;     // Close dropdown first
		const { logout } = await import('$lib/firebase/auth');
		await logout();           // Sign out user and redirect
	}

    // Open settings modal and close dropdown menu
    function showSettings() {
        accountPopup = false;     // Close dropdown
        settingsModal = true;     // Open settings modal
    }

    // CSS classes for the account button styling
    const classes = {
        default: `
            -m-2 p-2 pr-3
            flex flex-row 
            items-center justify-between 
            rounded-xl 
            font-medium 
            transition-all 
            overflow-hidden 
            bg-sidebar 
            text-sidebar-foreground/50 
            hover:text-sidebar-foreground 
            focus:text-sidebar-foreground 
            hover-on-sidebar-background 
            focus-ring
        `
    }
    
</script>

<!-- Show account button when user data is loaded -->
{#if $userProfile.firstName}
    <!-- Clickable account button that shows user info and opens dropdown menu -->
    <button bind:this={accountPopupTrigger} onclick={toggleAccountPopup} class={classes.default}>
        <!-- User info section with avatar and name -->
        <div class="flex flex-row items-center justify-start gap-3 mr-4">
            <Avatar />
            {$userProfile.firstName}
        </div>
        <!-- Menu indicator icon -->
        <Ellipsis size={20} />
    </button>
{:else}
    <!-- Loading skeleton while user data is being fetched -->
    <div class="h-12 block -m-2 bg-background animate-pulse rounded-lg"></div>
{/if}

<!-- Dropdown menu that appears when account button is clicked -->
{#if accountPopup }
	<Dropdown trigger={accountPopupTrigger} clickOutside={toggleAccountPopup} flyInFrom={10} position="bottom-14 left-2 w-[calc(100%-1rem)]">
		
        <!-- Menu items -->
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

	</Dropdown>
{/if}

<!-- Settings modal that opens when Settings is clicked -->
{#if settingsModal}
    <!-- Use portal to render modal at document root (escapes sidebar overflow) -->
    <Portal target="settings-modal">
        <Modal title="Settings" closeAction={() => settingsModal = false}>
            <!-- Simple settings content showing user info -->
            <p class="text-muted-foreground mb-2">Signed in as:</p>
            <p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
            <p class="mb-4">{$userProfile.email}</p>
        </Modal>
    </Portal>
{/if}