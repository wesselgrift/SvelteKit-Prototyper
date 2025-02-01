<script>
    let { children } = $props();
</script>
  
<div class="card border border-color-border rounded-xl p-4 bg-color-card">
    {#if children}
        {@render children()}
    {:else}
        <!-- Optional fallback content -->
    {/if}
</div>