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
            shadow-sm 
            transition-all 
            select-none 
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
                shadow-none 
            `,
            outline: `
                border border-border 
                bg-background 
                hover-on-background 
            `,
            ghost: `
                bg-transparent 
                hover-on-background 
                shadow-none 
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
                h-9     lg:h-10
                px-4    lg:px-5
            `,
            small: `
                h-8
                px-2    lg:px-3
            `,
            icon: `
                size-8
            `
        },
        width: {
            fill: `w-full`,
            hug: ``
        }
    }

</script>

<button {type} bind:this={element} onclick={onclick} class={
        classes.default + ' ' + 
        (disabled ? classes.variant.disabled : classes.variant[variant]) + ' ' +
        classes.size[size] + ' ' +
        classes.width[width]
}>
    {@render children()}
</button>