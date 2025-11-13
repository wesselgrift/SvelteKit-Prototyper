<script>
    let {
        children,
        ariaLabel = 'Breadcrumb'
    } = $props();
</script>

<nav aria-label={ariaLabel} class="breadcrumb">
    <ol class="flex flex-row items-center justify-start">
        {@render children()}
    </ol>
</nav>

