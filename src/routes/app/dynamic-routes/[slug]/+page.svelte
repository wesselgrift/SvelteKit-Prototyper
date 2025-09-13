<script>
    import { page } from '$app/state';
    import PageTitle from "$lib/components/parts/PageTitle.svelte";
    
    // Get the dynamic parameter from the URL
    const slug = $derived(page.params.slug);
    
    // State for route data
    let routeData = $state(null);
    let loading = $state(true);
    
    // Fetch route data to get proper title and description
    async function fetchRouteData() {
        try {
            const response = await fetch('/api/dynamic-routes');
            const data = await response.json();
            routeData = data.routes.find(route => route.slug === slug);
        } catch (error) {
            console.error('Failed to fetch route data:', error);
            routeData = null;
        } finally {
            loading = false;
        }
    }
    
    // Refetch data when slug changes
    $effect(() => {
        if (slug) {
            loading = true;
            fetchRouteData();
        }
    });
</script>
  
{#if loading}
    <div class="animate-pulse space-y-4">
      <div class="h-8 w-1/3 bg-foreground/10 rounded"></div>
      <div class="h-4 w-1/2 bg-foreground/10 rounded"></div>
      <div class="h-4 w-1/4 bg-foreground/10 rounded"></div>
    </div>
{:else if routeData}
    <PageTitle title={routeData.title} />
    <p class="mb-6 text-muted-foreground">{routeData.description}</p>
    <p class="mb-4">This is a dynamic route with a parameter, slug, that can be used to load data dynamically when a user requests a page like <kbd>/some-folder/[slug]</kbd>.</p>
    <p>You can find the dummy data in <kbd>/src/routes/api/dynamic-routes/dummy-routes.json</kbd>.</p>
{:else}
    <PageTitle title="Page Not Found" />
    <p>No page found for slug: <strong><kbd>{slug}</kbd></strong></p>
    <p class="mb-4">This slug doesn't exist in our routes configuration. Try one of the available routes from the sidebar.</p>
    <p>Available routes can be found in the sidebar navigation under "Dynamic routing".</p>
{/if}

  <style>
    kbd {
      @apply rounded-md px-2 py-1 bg-blue-500/20 text-xs;
    }
  </style>