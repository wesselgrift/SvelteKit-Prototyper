<script>
	// Svelte, Auth and user store
	import { userProfile } from '$lib/stores/userStore';

	// Components
	import SidebarAccountMenu from './SidebarAccountMenu.svelte';
    import { Ellipsis } from 'lucide-svelte';
    import Avatar from '$lib/components/parts/Avatar.svelte';

	// State
	let AccountMenuOpen = $state(false);
	let accountMenu = $state(null);

	// Open profile menu
	function openSidebarMenu(event) {
		event.stopPropagation();
		AccountMenuOpen = !AccountMenuOpen;
	}

	// Close profile menu when clicking outside
	function handleClickOutside(event) {
		if (accountMenu && !accountMenu.contains(event.target) && AccountMenuOpen) {
			AccountMenuOpen = false;
		}
	}

	// Effect to handle click outside listener when menu is open
	$effect(() => {
		if (AccountMenuOpen) {
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<!-- Account Menu Button -->
<button onclick={openSidebarMenu} class="-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 text-sidebar-foreground/50 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground active:bg-sidebar-accent-foreground/10 focus:text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2">
	<div class="flex flex-row items-center justify-start gap-3 mr-4">
		<Avatar userName={$userProfile.firstName} />
		{$userProfile.firstName}
	</div>
	<Ellipsis size={20} strokeWidth={2} />
</button>

<!-- Account Menu that opens when the button is clicked -->
{#if AccountMenuOpen}
	<SidebarAccountMenu bind:menuWrapper={accountMenu} />
{/if}
