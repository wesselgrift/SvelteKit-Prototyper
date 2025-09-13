<script>
	// Import page state to track current route and sidebar visibility store
    import { page } from "$app/state";
    import { viewSidebar } from "$lib/stores/uiStore";

    // Auto-close sidebar on mobile after user clicks a navigation link
    // Uses timeout to allow navigation animation to start before closing
    function handleMenuItemClick(event) {
        setTimeout(() => {
            $viewSidebar = false;  // Hide sidebar after brief delay
        }, 300);
    }
</script>


<!-- Filesystem routing -->
<span class="text-xs font-medium text-muted-foreground">Filesystem routing</span>

<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app" onclick={handleMenuItemClick}>Hello World</a>
<a class="font-medium { page.url.pathname === '/app/components' ? 'text-primary underline' : '' }" href="/app/components" onclick={handleMenuItemClick}>Components</a>

<!-- Dynamic routes -->
<span class="text-xs font-medium text-muted-foreground mt-5">Dynamic routing</span>

<div class="flex flex-col gap-4">
    <a class="font-medium { page.url.pathname === '/app/dynamic-route/howdy' ? 'text-primary underline' : '' }" href="/app/dynamic-route/howdy" onclick={handleMenuItemClick}>Howdy!</a>
    <a class="font-medium { page.url.pathname === '/app/dynamic-route/cowboy' ? 'text-primary underline' : '' }" href="/app/dynamic-route/cowboy" onclick={handleMenuItemClick}>Cowboy!</a>
    <a class="font-medium { page.url.pathname === '/app/dynamic-route/how-are-ya' ? 'text-primary underline' : '' }" href="/app/dynamic-route/how-are-ya" onclick={handleMenuItemClick}>How are ya?</a>
</div>