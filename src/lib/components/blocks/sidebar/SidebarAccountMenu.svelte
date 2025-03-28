<script>
	// Svelte, Auth and user store
	import { userProfile, settingsModal } from '$lib/stores/userStore';
	import { logout } from '$lib/firebase/auth';

	// Components & styles
	import Separator from '$lib/components/parts/Separator.svelte';
    import { LogOut } from 'lucide-svelte';

	// Transition
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Props
	export let menuWrapper;

	// Functions
	async function handleLogout() {
		await logout();
	}
</script>


<div class="absolute bottom-12 left-2 z-10 mb-2 flex w-[calc(100%-1rem)] flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-md"
	transition:fly={{
		duration: 150,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}
	bind:this={menuWrapper}
>
	<!-- Menu links -->
	<span class="flex w-full items-center justify-between gap-2 px-3 py-2 text-muted-foreground">
		{$userProfile.email}
	</span>

	<button class="flex w-full overflow-hidden rounded-lg cursor-pointer items-center justify-between gap-2 px-3 py-2 text-popover-foreground hover-on-popover" onclick={() => $settingsModal = true}>
		Settings
	</button>

	<!-- Separator -->
	<div class="px-3"><Separator /></div>

	<!-- Logout button -->
	<button onclick={handleLogout} class="flex w-full overflow-hidden rounded-lg cursor-pointer items-center justify-between gap-2 px-3 py-2 text-popover-foreground hover-on-popover">
		Uitloggen
		<LogOut size={18} strokeWidth={2} />
	</button>
</div>