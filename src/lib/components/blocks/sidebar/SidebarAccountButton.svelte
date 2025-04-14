<script>
	// Auth and stores
	import { userProfile } from '$lib/stores/userStore';
    import { settingsModal } from '$lib/stores/uiStore';
    import { logout } from '$lib/firebase/auth';

	// Components
	import DropdownMenu from '$lib/components/blocks/dropdownmenu/DropdownMenu.svelte';
	import MenuItem from '$lib/components/blocks/dropdownmenu/MenuItem.svelte';
    import Avatar from '$lib/components/parts/Avatar.svelte';
    import Separator from '$lib/components/parts/Separator.svelte';
    import { Ellipsis, LogOut, Settings } from 'lucide-svelte';

    // Element states
    let accountPopup = $state(false);
    let accountPopupTrigger = $state();

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
        $settingsModal = true;
    }

    const defaultClasses = 
    "-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 font-medium transition-all overflow-hidden bg-sidebar text-sidebar-foreground/50 hover:text-sidebar-foreground focus:text-sidebar-foreground hover-on-sidebar-background focus-ring";

    
</script>

<!-- Account Menu Button -->
<button bind:this={accountPopupTrigger} onclick={toggleAccountPopup} class={defaultClasses}>
	<div class="flex flex-row items-center justify-start gap-3 mr-4">
		<Avatar userName={$userProfile.firstName} />
		{$userProfile.firstName}
	</div>
	<Ellipsis size={20} />
</button>

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
