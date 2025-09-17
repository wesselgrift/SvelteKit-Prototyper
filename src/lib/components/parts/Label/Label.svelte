<script>
    // Component props for form labels
    let { 
        forId,      // The ID of the input this label is associated with (for accessibility)
        label       // The text content to display in the label
    } = $props();

    // Basic label styling with consistent typography
    const classes = {
        default: `
            block 
            font-medium 
            text-foreground
        `
    }
</script>
  
<!-- Form label that connects to an input via the 'for' attribute -->
<label for={forId} class={classes.default}>{label}</label>