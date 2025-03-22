<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
        size = 'default',
        width = 'fill'
    } = $props();

    const defaultClasses = 'flex items-center justify-center font-medium rounded-lg transition focus:ring-2 focus:ring-color-ring focus:ring-offset-2 focus:outline-none';

    const widthType = {
        fill: "w-full",
        hug: ""
    }

    const sizes = {
        default: "py-2.5 lg:py-3.5 px-4 lg:px-5",
        small: "py-1 lg:py-1.5 px-2 lg:px-3"
    }

    const variants = {
        primary: `${defaultClasses} bg-color-primary hover:bg-color-primary-hover text-color-primary-foreground font-semibold focus:bg-color-primary-hover`,
        secondary: `${defaultClasses} bg-color-secondary hover:bg-color-secondary-hover text-color-secondary-foreground`,
        outline: `${defaultClasses} border border-color-border bg-color-background hover:bg-color-background-hover text-color-foreground`
    }

    
</script>
  
<button {type} onclick={onclick} class={variants[variant] + ' ' + sizes[size] +' '+ widthType[width]}>
    {#if children}
        {@render children()}
    {/if}
</button>