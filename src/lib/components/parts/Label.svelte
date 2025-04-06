<script>
    // Props
    let { 
        forId, 
        label
    } = $props();
</script>
  
<label for={forId} class="block font-medium text-foreground">{label}</label>