<script>
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
	
    let { children } = $props();
</script>

<Protected>
    <div class="flex animate-fade-in">
        <Sidebar />
        <main class="flex-1 overflow-y-scroll max-h-screen">
            <div class="p-10">
                {@render children()}
            </div>
        </main>
    </div>
</Protected>