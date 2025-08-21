<script>
    // Accept props from parent component to configure the text link
    let { 
        href,                      // URL or path the link should navigate to
        text,                      // Text content to display inside the link
        variant = 'primary',       // Visual style variant - defaults to 'primary'
    } = $props();

    // CSS class definitions organized by purpose
    // Using Tailwind utility classes for consistent styling across the app
    const classes = {
        // Base styles applied to all text links regardless of variant
        // These provide consistent interaction states and accessibility
        default: `
            transition 
            rounded 
            focus-ring 
            outline-none
        `,
        // Different visual styles for different use cases
        variants: {
            // Standard link style - prominent and clearly clickable
            primary: `
                text-primary 
                underline
            `,
            // Subtle link style - less prominent, shows on hover
            muted: `
                text-muted-foreground 
                hover:text-foreground
            `,
            // Non-interactive link style - appears disabled
            disabled: `
                text-muted-foreground 
                pointer-events-none 
                opacity-50 
                select-none
            `,
        }
    }
</script>

<!-- 
    Render an anchor element with dynamic styling based on the variant prop
    - {href} is Svelte shorthand for href={href}
    - Classes are concatenated to combine base styles with variant-specific styles
    - The variant prop determines which visual style from the variants object is used
-->
<a class={classes.default + ' ' + classes.variants[variant]} {href}>{text}</a>