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

<!-- Navigation links with active state styling -->
<!-- Active link is highlighted when current page matches the href -->
<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app" onclick={handleMenuItemClick}>Hello World</a>
<a class="font-medium { page.url.pathname === '/app/components' ? 'text-primary underline' : '' }" href="/app/components" onclick={handleMenuItemClick}>Components</a>