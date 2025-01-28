<script>
	import '$src/app.css';
    import Protected from "$lib/components/auth/Protected.svelte";
    import TopNavigation from "$lib/components/auth/navigation/TopNavigation.svelte";
	
    let { children } = $props();

</script>

<Protected>
    <TopNavigation />

    <div class="p-5">
        {@render children()}
    </div>
</Protected>