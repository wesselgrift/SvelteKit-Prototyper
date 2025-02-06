<script>
    import { page } from "$app/state";
    import { LogOut } from "lucide-svelte";
    import { logout } from "$lib/firebase/auth";
    import { user } from "$lib/stores/userStore";
    import { getDocument } from "$lib/firebase/firestore";
    import Logo from '$lib/components/ui/Logo.svelte';

    let firstName = $state('');

    $effect(async () => {

        // Get first name from Firestore based on user id
        if ($user) {
            const userDoc = await getDocument("users", $user.uid);

            // Set the first name
            firstName = userDoc.firstName;
        } else {
            // If user is not logged in, set first name to 'Unknown'
            firstName = 'Unknown';
        }
    });

    async function handleLogout() {
        await logout();
    }
</script>

<div class="flex flex-col h-screen justify-between items-center py-0">
    <div class="block w-full p-4">
       <Logo className="mb-4" />
    </div>    
    <div class="p-4 h-full w-full flex flex-col justify-start gap-5">
        <a class="text-base font-medium { page.url.pathname === '/app' ? 'text-color-primary underline' : '' }" href="/app">Page 1</a>
        <a class="text-base font-medium { page.url.pathname === '/app/page-2' ? 'text-color-primary underline' : '' }" href="/app/page-2">Page 2</a>
        <a class="text-base font-medium { page.url.pathname === '/app/page-3' ? 'text-color-primary underline' : '' }" href="/app/page-3">Page 3</a>
    </div>
    <div class="w-full flex flex-col p-4">
        {#if firstName}
            <p class="text-base mb-1 text-color-muted-foreground">Signed in as {firstName}</p>
        {:else}
            <div class="h-[1.25rem] w-32 bg-gray-200 animate-pulse rounded"></div>
        {/if}
        <button class="text-base text-color-primary hover:text-color-primary-hover font-medium flex flex-row items-center justify-start gap-1" onclick={handleLogout}>
            Log out
            <LogOut strokeWidth={2.3} size={16} />
        </button>
    </div>
</div>