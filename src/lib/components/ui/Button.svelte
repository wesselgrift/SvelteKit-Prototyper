<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
    } = $props();

    const variants = {
        primary: 'flex items-center justify-center shadow-md py-2 block text-md bg-color-primary hover:bg-color-primary-hover text-color-primary-foreground w-full mb-5 rounded-lg transition focus:bg-color-primary-hover focus:ring-2 focus:ring-color-ring focus:ring-offset-2 focus:outline-none',
        secondary: 'flex items-center justify-center py-2 block text-md text-md mb-5 block border border-color-border bg-color-secondary hover:bg-color-secondary-hover text-color-secondary-foreground w-full rounded-lg transition focus:ring-2 focus:ring-color-ring focus:ring-offset-2 focus:outline-none shadow-sm'
    }
</script>
  
<button {type} onclick={onclick} class={variants[variant]}>
    {#if children}
        {@render children()}
    {/if}
</button>