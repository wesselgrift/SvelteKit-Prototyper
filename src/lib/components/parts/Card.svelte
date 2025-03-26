<script>
    let { children } = $props();
</script>
  
<div class="
    card p-6 rounded-xl shadow-sm border 
    border-border dark:border-border/60
    text-card-foreground
    bg-card
">
    {@render children()}
</div>