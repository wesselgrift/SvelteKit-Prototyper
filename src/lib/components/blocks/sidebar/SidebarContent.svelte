<script>
	// Navigation
    import { page } from "$app/state";
</script>

<a class="font-medium { page.url.pathname === '/app' ? 'text-primary underline' : '' }" href="/app">Hello World</a>
<a class="font-medium { page.url.pathname === '/app/page-2' ? 'text-primary underline' : '' }" href="/app/page-2">Components</a>
<a class="font-medium { page.url.pathname === '/app/page-3' ? 'text-primary underline' : '' }" href="/app/page-3">Theme</a>