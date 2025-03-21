<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
    } = $props();

    const defaultClasses = 'w-full flex items-center justify-center py-2.5 lg:py-3.5 mb-4 lg:mb-5 text-sm font-medium rounded-lg transition focus:ring-2 focus:ring-color-ring focus:ring-offset-2 focus:outline-none';

    const variants = {
        primary: `${defaultClasses} bg-color-primary hover:bg-color-primary-hover text-color-primary-foreground  focus:bg-color-primary-hover`,
        secondary: `${defaultClasses} border border-color-border bg-color-secondary hover:bg-color-secondary-hover text-color-secondary-foreground`
    }
</script>
  
<button {type} onclick={onclick} class={variants[variant]}>
    {#if children}
        {@render children()}
    {/if}
</button>