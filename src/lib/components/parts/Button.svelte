<script>
    // Props
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
        size = 'default',
        disabled = false,
        width = 'fill'
    } = $props();

    // Default classes
    const defaultClasses = 
    "relative overflow-hidden gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-ring transition-all";

    // Width types
    const widthType = {
        fill: "w-full",
        hug: ""
    }

    // Sizes
    const sizes = {
        default: "py-2.5 lg:py-3.5 px-4 lg:px-5",
        small: "py-1 lg:py-1.5 px-2 lg:px-3",
        icon: "p-1.5"
    }

    // Variants
    const variants = {
        primary: `bg-primary text-primary-foreground hover-on-primary hover-on-primary`,
        secondary: `bg-secondary text-secondary-foreground hover-on-secondary`,
        outline: `border border-border bg-background hover-on-background`,
        ghost: `bg-transparent hover-on-background`,
        disabled: `bg-muted text-muted-foreground/70 pointer-events-none`
    }

</script>
  
<button {type} onclick={onclick} class={variants[variant] + ' ' + sizes[size] +' '+ widthType[width] + ' ' + defaultClasses} {disabled}>
    {#if children}
        {@render children()}
    {/if}
</button>