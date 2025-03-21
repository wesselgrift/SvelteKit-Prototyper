<script>
    let { 
        children,
        variant = 'default'
    } = $props();

    const defaultClasses = 'dialog border p-4 rounded-lg';

    const variants = {
        default: `${defaultClasses} border-color-border bg-color-card text-color-card-foreground`,
        success: `${defaultClasses} border-color-success bg-color-success text-color-success-foreground`,
        error: `${defaultClasses} border-color-destructive bg-color-destructive text-color-destructive-foreground`,
    }
</script>
  
<div class={variants[variant]}>
    {#if children}
        {@render children()}
    {:else}
        <!-- Optional fallback content -->
    {/if}
</div>