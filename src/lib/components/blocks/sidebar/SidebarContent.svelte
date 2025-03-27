<script>
	// Navigation
    import { page } from "$app/state";
</script>

<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app">Hello World</a>
<a class="font-medium { page.url.pathname === '/app/components' ? 'text-primary underline' : '' }" href="/app/components">Components</a>