<script>
    let { 
        name, 
        label,
        marginBottom = 'mb-2',
    } = $props();
</script>
  
<label for={name} class="block text-sm font-medium text-color-foreground {marginBottom}">{label}</label>