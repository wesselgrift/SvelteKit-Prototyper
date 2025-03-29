<script>
	// Auth and stores
	import { userProfile } from '$lib/stores/userStore';
    import { settingsModal } from '$lib/stores/uiStore';
    import { logout } from '$lib/firebase/auth';

	// Components
	import SidebarAccountMenu from '$lib/components/blocks/sidebar/SidebarAccountMenu.svelte';
	import SidebarMenuItem from '$lib/components/blocks/sidebar/SidebarMenuItem.svelte';
    import Avatar from '$lib/components/parts/Avatar.svelte';
    import Separator from '$lib/components/parts/Separator.svelte';
    import { Ellipsis, LogOut, Settings } from 'lucide-svelte';

    // States
    let accountPopup = $state(false);
    let popupWrapper = $state();

	// Open profile menu
	function toggleAccountPopup(event) {
		event.stopPropagation();
		accountPopup = !accountPopup;
	}

    // Close profile menu when clicking outside of the popupWrapper
    function handleClickOutside(event) {
        if (popupWrapper && !popupWrapper.contains(event.target) && accountPopup) {
            accountPopup = false;
        }
    }

    // Add event listener to close profile menu when clicking outside of the popupWrapper
    $effect(() => {
        if (accountPopup) {
            window.addEventListener('mouseup', handleClickOutside);
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
        $settingsModal = true;
    }

    const defaultClasses = 
    "-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 font-medium transition-all overflow-hidden bg-sidebar text-sidebar-foreground/50 hover:text-sidebar-foreground focus:text-sidebar-foreground hover-on-sidebar-background ring";

    
</script>

<!-- Account Menu Button -->
<button onclick={toggleAccountPopup} class={defaultClasses}>
	<div class="flex flex-row items-center justify-start gap-3 mr-4">
		<Avatar userName={$userProfile.firstName} />
		{$userProfile.firstName}
	</div>
	<Ellipsis size={20} strokeWidth={2} />
</button>

<!-- Account Menu that opens when the button is clicked -->
{#if accountPopup }
	<SidebarAccountMenu bind:element={popupWrapper}>
		<SidebarMenuItem disabled={true}>
            {$userProfile.email}
        </SidebarMenuItem>
		<SidebarMenuItem onclick={handleSettings}>
            Settings
            <Settings size={18} strokeWidth={2} />
        </SidebarMenuItem>
        <div class="px-3">
            <Separator />
        </div>
		<SidebarMenuItem onclick={handleLogout}>
            Log out
            <LogOut size={18} strokeWidth={2} />
        </SidebarMenuItem>
	</SidebarAccountMenu>
{/if}
