<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
        size = 'default',
        width = 'fill'
    } = $props();

    const defaultClasses = 
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-all';

    const widthType = {
        fill: "w-full",
        hug: ""
    }

    const sizes = {
        default: "py-2.5 lg:py-3.5 px-4 lg:px-5",
        small: "py-1 lg:py-1.5 px-2 lg:px-3"
    }

    const variants = {
        primary: `${defaultClasses} bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary`,
        secondary: `${defaultClasses} bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary`,
        outline: `${defaultClasses} border border-border bg-background hover:bg-accent/70 active:bg-background hover:text-accent-foreground`
    }

    
</script>
  
<button {type} onclick={onclick} class={variants[variant] + ' ' + sizes[size] +' '+ widthType[width]}>
    {#if children}
        {@render children()}
    {/if}
</button>