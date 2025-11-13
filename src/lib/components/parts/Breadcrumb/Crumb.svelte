<script>
    // Individual breadcrumb item
    // Displays as a button-styled link or plain text depending on state
    
    import Button from '$lib/components/parts/Button/Button.svelte';

    let {
        label = 'Page', // Text to display in the breadcrumb
        href = undefined, // Optional link URL - if provided, crumb becomes clickable
        active = false // If true, this crumb represents the current page (non-clickable)
    } = $props();
</script>

<li>
    {#if active}
        <!-- Current page - not clickable, uses aria-current for accessibility -->
        <span aria-current="page" class="pointer-events-none">
            <Button variant="ghost" width="hug" size="breadcrumb">{label}</Button>
        </span>
    {:else if href}
        <!-- Clickable link to navigate to previous page -->
        <a {href}>
            <Button variant="ghostmuted" width="hug" size="breadcrumb">{label}</Button>
        </a>
    {:else}
        <!-- Non-clickable crumb (no href and not active) -->
        <Button variant="ghostmuted" width="hug" size="breadcrumb">{label}</Button>
    {/if}
</li>