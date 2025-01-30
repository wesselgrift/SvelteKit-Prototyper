<script>
	import '$src/app.css';
    import Protected from "$lib/components/auth/Protected.svelte";
    import Sidebar from "$lib/components/ui/Sidebar.svelte";
	
    let { children } = $props();

</script>

<Protected>
    <div class="flex min-h-screen">
        <aside class="w-64 bg-gray-50">
            <Sidebar />
        </aside>
        <main class="flex-1">
            <div class="p-8">
                {@render children()}
            </div>
        </main>
    </div>
</Protected>