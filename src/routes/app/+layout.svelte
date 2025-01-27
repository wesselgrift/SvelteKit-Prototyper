<script>
	import '$src/app.css';
    import { logout } from "$lib/firebase/auth";
    import { page } from "$app/state";
    import { LogOut } from "lucide-svelte";
    import Protected from "$lib/components/auth/Protected.svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { doc, getDoc, getFirestore } from "firebase/firestore";

	let { children } = $props();
    let firstName = $state('');
    const db = getFirestore();

    $effect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    firstName = userDoc.data().firstName;
                }
            }
        });
    });

    async function handleLogout() {
        await logout();
    }
</script>

<Protected>
    <div class="flex flex-row justify-between items-center gap-10 py-0 px-5 border-b border-1">
        <img src="/logo.svg" alt="Google" class="h-7 mr-2" />
        <div class="h-full flex flex-row justify-end items-center gap-10">
            <a class="text-sm font-medium { page.url.pathname === '/app' ? 'text-primary-default' : '' }" href="/app">Home</a>
            <a class="text-sm font-medium { page.url.pathname === '/app/page-2' ? 'text-primary-default' : '' }" href="/app/page-2">Page 2</a>
            <a class="text-sm font-medium { page.url.pathname === '/app/page-3' ? 'text-primary-default' : '' }" href="/app/page-3">Page 3</a>
        </div>
        <div style="min-width: 12rem;" class="flex flex-col items-end border-l border-1 py-3 px-5">
            {#if firstName}
                <p class="text-sm text-gray-400">Signed in as {firstName}</p>
            {:else}
                <div class="h-[1.25rem] w-32 bg-gray-200 animate-pulse rounded"></div>
            {/if}
            <button class="text-sm text-primary-default font-medium flex flex-row items-center justify-end gap-1" onclick={handleLogout}>
                Log out 
                <LogOut strokeWidth={2.3} size={16} />
            </button>
        </div>
    </div>

    <div class="p-5">
        {@render children()}
    </div>
</Protected>

