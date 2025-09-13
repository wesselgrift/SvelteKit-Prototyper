<script>
    // Component props
    let { 
        children,                      // Content to render inside the dialog
        variant = 'default'            // Dialog style variant: 'default' or 'error'
    } = $props();

    // Styling classes for different dialog variants
    // Each variant provides different visual themes for different use cases
    const classes = {
        default: `
            dialog 
            border 
            p-4 
            rounded-lg
            border-border 
            bg-card 
            text-color-card-foreground
        `,
        error: `
            dialog 
            border 
            p-4 
            rounded-lg
            border-destructive 
            bg-destructive 
            text-destructive-foreground
        `
    }
</script>
  
<!-- Dialog container with variant-based styling -->
<!-- Used for modal dialogs, alerts, confirmations, etc. -->
<div class={classes[variant]}>
    <!-- Render whatever content was passed as children -->
    {@render children()}
</div>