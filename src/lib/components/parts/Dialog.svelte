<script>
    // Props
    let { 
        children,
        variant = 'default'
    } = $props();

    // Default classes
    const defaultClasses = 'dialog border p-4 rounded-lg';

    // Variants
    const variants = {
        default: `${defaultClasses} border-border bg-card text-color-card-foreground`,
        error: `${defaultClasses} border-destructive bg-destructive text-destructive-foreground`
    }
</script>
  
<div class={variants[variant]}>
    {#if children}
        {@render children()}
    {:else}
        <!-- Optional fallback content -->
    {/if}
</div>