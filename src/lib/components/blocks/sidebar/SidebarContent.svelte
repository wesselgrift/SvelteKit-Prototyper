<script>
	// Navigation
    import { page } from "$app/state";
    import { viewSidebar } from "$lib/stores/uiStore";

    // Close sidebar after click on menu item
    function handleMenuItemClick(event) {
        setTimeout(() => {
            $viewSidebar = false;
        }, 300);
    }
</script>

<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app" onclick={handleMenuItemClick}>Hello World</a>
<a class="font-medium { page.url.pathname === '/app/components' ? 'text-primary underline' : '' }" href="/app/components" onclick={handleMenuItemClick}>Components</a>