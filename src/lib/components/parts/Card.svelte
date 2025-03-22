<script>
    let { children } = $props();
</script>
  
<div class="
    card p-6 rounded-xl shadow-sm border 
    border-color-border
    dark:border-color-border-dark
    text-color-card-foreground
    dark:text-color-card-foreground-dark 
    bg-color-card 
    dark:bg-color-card-dark 
">
    {@render children()}
</div>