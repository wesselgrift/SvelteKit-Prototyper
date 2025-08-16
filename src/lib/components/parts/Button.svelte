<script>
    // Props
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
        size = 'default',
        disabled = false,
        width = 'fill',
        element = $bindable()
    } = $props();

    const classes = {
        default: `
            relative 
            overflow-hidden 
            inline-flex gap-2 items-center justify-center whitespace-nowrap 
            rounded-lg
            font-medium 
            disabled:pointer-events-none 
            disabled:opacity-50 
            focus-ring 
            transition-all
            h-fit
            [&_svg]:pointer-events-none 
            [&_svg]:shrink-0 
        `,
        variant: {
            primary: `
                bg-primary 
                text-primary-foreground 
                hover-on-primary 
                hover-on-primary
            `,
            secondary: `
                bg-secondary 
                text-secondary-foreground 
                hover-on-secondary
            `,
            outline: `
                border border-border 
                bg-background 
                hover-on-background
            `,
            ghost: `
                bg-transparent 
                hover-on-background
            `,
            disabled: `
                bg-muted 
                text-muted-foreground/70 
                pointer-events-none 
                border 
                border-muted
            `,
        },
        size: {
            default: `
                py-2.5  lg:py-3.5 
                px-4    lg:px-5
            `,
            small: `
                py-1    lg:py-1.5 
                px-2    lg:px-3
            `,
            icon: `
                p-1.5
            `
        },
        width: {
            fill: `w-full`,
            hug: ``
        }
    }

</script>

<button {type} bind:this={element} onclick={onclick} class={
        (disabled ? classes.variant.disabled : classes.variant[variant]) + ' ' +
        classes.size[size] + ' ' +
        classes.width[width] + ' ' +
        classes.default 
}>
    {@render children()}
</button>