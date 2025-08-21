<script>
    // Component props with default values
    let { 
        children,                    // Button content (text, icons, etc.)
        type = 'button',             // HTML button type (button, submit, reset)
        onclick = () => {},          // Click handler function
        variant = 'primary',         // Visual style (primary, secondary, outline, ghost)
        size = 'default',            // Button size (default, small, icon)
        disabled = false,            // Whether button is disabled
        width = 'fill',              // Width behavior (fill = full width, hug = content width)
        element = $bindable()        // Reference to the actual button element
    } = $props();

    // CSS class definitions for different button styles
    const classes = {
        // Base styles applied to all buttons
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
            select-none 
            [&_svg]:pointer-events-none 
            [&_svg]:shrink-0 
        `,
        // Different visual styles
        variant: {
            primary: `
                bg-primary 
                text-primary-foreground 
                hover-on-primary 
                hover-on-primary 
                shadow-sm
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
                shadow-sm
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
        // Different button sizes
        size: {
            default: `
                h-9     lg:h-10
                px-4    lg:px-5
            `,
            small: `
                h-7     lg:h-8
                px-2    lg:px-3
            `,
            icon: `
                size-8
            `
        },
        // Width behavior options
        width: {
            fill: `w-full`,    // Takes full available width
            hug: ``            // Only as wide as content
        }
    }

</script>

<!-- Render button with dynamically combined CSS classes -->
<button {type} bind:this={element} onclick={onclick} class={
        classes.default + ' ' + 
        (disabled ? classes.variant.disabled : classes.variant[variant]) + ' ' +
        classes.size[size] + ' ' +
        classes.width[width]
}>
    <!-- Render whatever content was passed as children (text, icons, etc.) -->
    {@render children()}
</button>