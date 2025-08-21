<script>
    // Accept any content passed between the Card component tags
    // This uses Svelte 5's snippet system for component composition
    let { children } = $props();

    // Card classes
    const classes = {
        default: `
            bg-card
            text-card-foreground 
            p-6 rounded-xl shadow-sm 
            border 
            border-border 
            dark:border-border/60
        `
    }
</script>
  
<!-- Reusable card container component -->
<div class={classes.default}>
    <!-- Render whatever content was passed as children -->
    {@render children()}
</div>