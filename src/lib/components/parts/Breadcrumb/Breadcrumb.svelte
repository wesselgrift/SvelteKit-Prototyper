<script>
    // Main breadcrumb container component
    // Use this to wrap Crumb and Divider components to show navigation hierarchy
    // Example: <Breadcrumb><Crumb label="Home" /><Divider /><Crumb label="About" active /></Breadcrumb>
    
    let {
        children, // Snippet containing Crumb and Divider components
        ariaLabel = 'Breadcrumb' // Accessibility label for screen readers
    } = $props();

    // Styles for the breadcrumb list
    const classes = {
        list: `
            flex flex-row items-center justify-start
        `,
    }
</script>

<!-- Semantic nav element for accessibility -->
<nav aria-label={ariaLabel}>
    <ol class={classes.list}>
        {@render children()}
    </ol>
</nav>