<script>
    import { page } from "$app/state";
    import { LogOut } from "lucide-svelte";
    import { logout } from "$lib/firebase/auth";
    import { getAuth } from "firebase/auth";
    import { doc, getDoc, getFirestore } from "firebase/firestore";
    import Logo from '$lib/components/ui/Logo.svelte';

    let firstName = $state('');
    const db = getFirestore();

    $effect(async () => {
        const user = getAuth().currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            firstName = userDoc.exists() ? userDoc.data().firstName : 'Unknown';
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
        <a class="text-sm font-medium { page.url.pathname === '/app' ? 'text-color-primary underline' : '' }" href="/app">Page 1</a>
        <a class="text-sm font-medium { page.url.pathname === '/app/page-2' ? 'text-color-primary underline' : '' }" href="/app/page-2">Page 2</a>
        <a class="text-sm font-medium { page.url.pathname === '/app/page-3' ? 'text-color-primary underline' : '' }" href="/app/page-3">Page 3</a>
    </div>
    <div class="w-full flex flex-col p-4">
        {#if firstName}
            <p class="text-sm mb-1 text-color-muted-foreground">Signed in as {firstName}</p>
        {:else}
            <div class="h-[1.25rem] w-32 bg-gray-200 animate-pulse rounded"></div>
        {/if}
        <button class="text-sm text-color-primary hover:text-color-primary-hover font-medium flex flex-row items-center justify-start gap-1" onclick={handleLogout}>
            Log out
            <LogOut strokeWidth={2.3} size={16} />
        </button>
    </div>
</div>