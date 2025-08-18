<script>
    // Props
    let { 
        forId, 
        label
    } = $props();

    const classes = {
        default: `
            block 
            font-medium 
            text-foreground
        `
    }
</script>
  
<label for={forId} class={classes.default}>{label}</label>