<script>
    let { children } = $props();
</script>
  
<div class="card border p-5 text-sm rounded-xl shadow-sm">
    {@render children()}
</div>