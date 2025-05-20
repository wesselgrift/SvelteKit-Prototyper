<script>
    // Props
    let { children } = $props();

    const classes = {
        card: `
            bg-card
            text-card-foreground 
            p-6 rounded-xl shadow-sm 
            border 
            border-border 
            dark:border-border/60
        `
    }
</script>
  
<div class={classes.card}>
    {@render children()}
</div>