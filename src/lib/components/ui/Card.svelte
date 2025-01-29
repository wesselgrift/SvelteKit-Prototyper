<script>
    let { children } = $props();
</script>
  
<div class="card border border-gray-200 rounded-lg p-4">
    {#if children}
        {@render children()}
    {:else}
        <!-- Optional fallback content -->
    {/if}
</div>