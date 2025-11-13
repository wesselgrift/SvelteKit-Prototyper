<script>
    import Button from '$lib/components/parts/Button/Button.svelte';

    let {
        label = 'Page',
        href = undefined,
        active = false
    } = $props();
</script>

<li>
    {#if active}
        <span aria-current="page" class="pointer-events-none">
            <Button variant="ghost" width="hug" size="breadcrumb">{label}</Button>
        </span>
    {:else if href}
        <a {href}>
            <Button variant="ghostmuted" width="hug" size="breadcrumb">{label}</Button>
        </a>
    {:else}
        <Button variant="ghostmuted" width="hug" size="breadcrumb">{label}</Button>
    {/if}
</li>