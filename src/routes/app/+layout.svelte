<script>
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
	
    let { children } = $props();
</script>

<Protected>
    <div class="flex animate-fade-in">
        <aside class="w-64">
            <Sidebar />
        </aside>
        <main class="flex-1">
            <div class="p-10">
                {@render children()}
            </div>
        </main>
    </div>
</Protected>