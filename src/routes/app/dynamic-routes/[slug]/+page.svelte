<script>
    // Import the PageTitle component
    import PageTitle from "$lib/components/parts/PageTitle.svelte";
    
    // Get route data from the load function
    let { data } = $props();
    
    // Extract routeData reactively - this will update when data changes
    const routeData = $derived(data.routeData);
</script>

<!-- Page content for a valid dynamic route -->
<PageTitle title={routeData.title} />

<p class="mb-6 text-muted-foreground">{routeData.description}</p>

<p class="mb-4">
    This is a dynamic route with a parameter, slug, that can be used to load data dynamically when a user requests a page like <kbd>/some-folder/[slug]</kbd>.
</p>
<p>
    You can find the dummy data in <kbd>/src/routes/api/dynamic-routes/dummy-routes.json</kbd>.
</p>

<!-- Style for the keyboard shortcut -->
<style>
    kbd {
        @apply rounded-md px-2 py-1 bg-blue-500/20 text-xs;
    }
</style>