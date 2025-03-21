<script>
    let { 
        children,
        variant = 'default',
        borderRadius = 'rounded-xl',
    } = $props();

    const defaultClasses = 'card border p-4';

    const variants = {
        default: `${defaultClasses} border-color-border bg-color-card text-color-card-foreground`,
        danger: `${defaultClasses} border-color-destructive bg-color-destructive text-color-destructive-foreground`,
    }
</script>
  
<div class={variants[variant] + ' ' + borderRadius}>
    {#if children}
        {@render children()}
    {:else}
        <!-- Optional fallback content -->
    {/if}
</div>