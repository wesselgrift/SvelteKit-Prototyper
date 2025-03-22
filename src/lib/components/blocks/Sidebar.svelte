<script>
	// Svelte, Auth and user store
    import { page } from "$app/state";
    import { logout } from "$lib/firebase/auth";
    import { userProfile } from "$lib/stores/userStore";

	// Components
    import { LogOut } from "lucide-svelte";
    import Logo from '$lib/components/parts/Logo.svelte';

    async function handleLogout() {
        await logout();
    }
</script>

<div class="flex flex-col h-screen justify-between items-center py-0">
    <div class="block w-full p-4">
       <Logo/>
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <a class="font-medium { page.url.pathname === '/app' ? 'text-color-primary underline' : '' }" href="/app">Hello World</a>
        <a class="font-medium { page.url.pathname === '/app/page-2' ? 'text-color-primary underline' : '' }" href="/app/page-2">Components</a>
        <a class="font-medium { page.url.pathname === '/app/page-3' ? 'text-color-primary underline' : '' }" href="/app/page-3">Theme</a>
    </div>
    <div class="w-full flex flex-col p-4">
        {#if $userProfile.firstName}
            <p class="mb-1 text-color-muted-foreground">Signed in as {$userProfile.firstName}</p>
        {:else}
            <div class="h-[1.25rem] w-32 bg-gray-200 animate-pulse rounded"></div>
        {/if}
        <button class="text-color-primary hover:text-color-primary-hover font-medium flex flex-row items-center justify-start gap-1" onclick={handleLogout}>
            Log out
            <LogOut strokeWidth={2.3} size={16} />
        </button>
    </div>
</div>