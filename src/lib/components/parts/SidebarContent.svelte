<script>
	// Import page state to track current route and sidebar visibility store
    import { page } from "$app/state";
    import { viewSidebar } from "$lib/stores/uiStore";
    import { onMount } from "svelte";

    // State for dynamic routes
    let dynamicRoutes = $state([]);
    let loading = $state(true);

    // Auto-close sidebar on mobile after user clicks a navigation link
    // Uses timeout to allow navigation animation to start before closing
    function handleMenuItemClick(event) {
        setTimeout(() => {
            $viewSidebar = false;  // Hide sidebar after brief delay
        }, 300);
    }

    // Fetch dynamic routes data
    async function fetchRoutes() {
        try {
            const response = await fetch('/api/dynamic-routes');
            const data = await response.json();
            dynamicRoutes = data.routes;
        } catch (error) {
            console.error('Failed to fetch dynamic routes:', error);
            dynamicRoutes = [];
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchRoutes();
    });
</script>


<!-- Filesystem routing -->
<span class="text-xs font-medium text-muted-foreground">Filesystem routing</span>
<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app" onclick={handleMenuItemClick}>Hello World</a>
<a class="font-medium { page.url.pathname === '/app/components' ? 'text-primary underline' : '' }" href="/app/components" onclick={handleMenuItemClick}>Components</a>

<!-- Dynamic routes -->
<span class="text-xs font-medium text-muted-foreground mt-5">Dynamic routing</span>
<div class="flex flex-col gap-4">
    {#if loading}
        <div class="flex flex-col gap-2">
            <div class="h-4 w-2/3 bg-muted-foreground/20 rounded animate-pulse"></div>
            <div class="h-4 w-1/2 bg-muted-foreground/20 rounded animate-pulse"></div>
            <div class="h-4 w-3/4 bg-muted-foreground/20 rounded animate-pulse"></div>
        </div>
    {:else if dynamicRoutes.length > 0}
        {#each dynamicRoutes as route}
            <a 
                class="font-medium { page.url.pathname === `/app/dynamic-routes/${route.slug}` ? 'text-primary underline' : '' }" 
                href="/app/dynamic-routes/{route.slug}" 
                onclick={handleMenuItemClick}
                title={route.description}
            >
                {route.title}
            </a>
        {/each}
    {:else}
        <span class="text-sm text-muted-foreground">No routes available</span>
    {/if}
</div>