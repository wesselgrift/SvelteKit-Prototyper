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
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ring transition-all";

    const widthType = {
        fill: "w-full",
        hug: ""
    }

    const sizes = {
        default: "py-2.5 lg:py-3.5 px-4 lg:px-5",
        small: "py-1 lg:py-1.5 px-2 lg:px-3"
    }

    const variants = {
        primary: `bg-primary text-primary-foreground hover-on-primary hover-on-primary`,
        secondary: `bg-secondary text-secondary-foreground hover-on-secondary`,
        outline: `border border-border bg-background hover-on-background`
    }

    
</script>
  
<button {type} onclick={onclick} class={variants[variant] + ' ' + sizes[size] +' '+ widthType[width] + ' ' + defaultClasses}>
    {#if children}
        {@render children()}
    {/if}
</button>