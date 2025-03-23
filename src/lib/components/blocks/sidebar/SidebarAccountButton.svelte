<script>
	// Svelte, Auth and user store
	import { userProfile } from '$lib/stores/userStore';
	import { Ellipsis } from 'lucide-svelte';

	// Components
	import SidebarAccountMenu from './SidebarAccountMenu.svelte';

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
<button onclick={openSidebarMenu} class="-m-2 flex flex-row items-center justify-between rounded-xl p-2 pr-3 text-color-muted-foreground hover:bg-gray-200 hover:text-color-foreground">
	<div class="flex flex-row items-center justify-start gap-3">
		<div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-fuchsia-500 text-white">
			{$userProfile.firstName[0]}
		</div>
		<span>{$userProfile.firstName}</span>
	</div>
	<Ellipsis size={20} strokeWidth={2} />
</button>

<!-- Account Menu that opens when the button is clicked -->
{#if AccountMenuOpen}
	<SidebarAccountMenu bind:menuWrapper={accountMenu} />
{/if}
