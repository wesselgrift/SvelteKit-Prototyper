<script>
	// Auth and stores
	import { userProfile } from '$lib/stores/userStore';
    import { viewSettings } from '$lib/stores/uiStore';
    import { logout } from '$lib/firebase/auth';

	// Components
	import DropdownMenu from '$lib/components/blocks/dropdownmenu/DropdownMenu.svelte';
	import MenuItem from '$lib/components/blocks/dropdownmenu/MenuItem.svelte';
    import Avatar from '$lib/components/parts/Avatar.svelte';
    import Separator from '$lib/components/parts/Separator.svelte';
    import { Ellipsis, LogOut, Settings } from 'lucide-svelte';

    // Element states
    let accountButton = $state();
    let accountPopup = $state(false);
    let popupWrapper = $state();
    

	// Open profile menu
	function toggleAccountPopup(event) {
        event.stopPropagation();
		accountPopup = !accountPopup;
	}

    // Close profile menu when clicking outside of the popupWrapper
    function handleClickOutside(event) {
        if (popupWrapper && !popupWrapper.contains(event.target) && !accountButton.contains(event.target) && accountPopup) {
            accountPopup = !accountPopup;
        }
    }

    // Add event listener to close profile menu when clicking outside of the popupWrapper
    $effect(() => {
        if (accountPopup) {
            window.addEventListener('mouseup', handleClickOutside);

            // Remove event listener when component is destroyed
            return () => window.removeEventListener('mouseup', handleClickOutside);
        }
    });

    // Handle Logout
	async function handleLogout() {
        accountPopup = false
		await logout();
	}

    // Handle Settings
    function handleSettings() {
        accountPopup = false;
        $viewSettings = true;
    }

    const defaultClasses = 
    "-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 font-medium transition-all overflow-hidden bg-sidebar text-sidebar-foreground/50 hover:text-sidebar-foreground focus:text-sidebar-foreground hover-on-sidebar-background focus-ring";

    
</script>

<!-- Account Menu Button -->
<button onclick={toggleAccountPopup} class={defaultClasses} bind:this={accountButton}>
	<div class="flex flex-row items-center justify-start gap-3 mr-4">
		<Avatar userName={$userProfile.firstName} />
		{$userProfile.firstName}
	</div>
	<Ellipsis size={20} />
</button>

<!-- Account Menu that opens when the button is clicked -->
{#if accountPopup }
	<DropdownMenu bind:element={popupWrapper} flyInFrom={10} classes="bottom-14 left-2 w-[calc(100%-1rem)]">
		<MenuItem disabled={true}>
            <span class="truncate">{$userProfile.email}</span>
        </MenuItem>
		<MenuItem onclick={handleSettings}>
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
