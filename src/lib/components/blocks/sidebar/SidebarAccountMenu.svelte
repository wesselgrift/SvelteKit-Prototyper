<script>
	// Svelte, Auth and user store
	import { userProfile } from '$lib/stores/userStore';
	import { LogOut } from 'lucide-svelte';
	import { logout } from '$lib/firebase/auth';

	// Components
	import Separator from '$lib/components/parts/Separator.svelte';

	// Transition
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Props
	export let profileMenu;

	// Functions
	async function handleLogout() {
		await logout();
	}
</script>


<div
	class="absolute bottom-12 left-2 z-10 mb-2 flex w-[calc(100%-1rem)] flex-col gap-1 rounded-xl border border-color-border bg-color-background p-1 shadow-md"
	transition:fly={{
		duration: 150,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}
	bind:this={profileMenu}
>
	<!-- Menu links -->
	<span
		class="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-color-muted-foreground"
	>
		{$userProfile.email}
	</span>

	<span
		class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 transition hover:bg-color-accent active:bg-color-accent-hover"
	>
		Settings
	</span>

	<!-- Separator -->
	<div class="px-3"><Separator /></div>

	<!-- Logout button -->
	<button
		class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 transition hover:bg-color-accent active:bg-color-accent-hover"
		onclick={handleLogout}
	>
		Uitloggen
		<LogOut size={18} strokeWidth={2} />
	</button>
</div>