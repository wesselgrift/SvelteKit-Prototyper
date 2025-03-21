<script>
    let { children } = $props();
</script>
  
<div class="card border p-8 text-color-card-foreground rounded-xl shadow-sm">
    {@render children()}
</div>