<script>
    // Props
    let { children } = $props();

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
  
<div class={classes.default}>
    {@render children()}
</div>