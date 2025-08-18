<script>
    // Props
    let { 
        href, 
        text,
        variant = 'primary',
    } = $props();

    const classes = {
        default: `
            transition 
            rounded 
            focus-ring 
            outline-none
        `,
        variants: {
            primary: `
                text-primary 
                underline
            `,
            muted: `
                text-muted-foreground 
                hover:text-foreground
            `,
            disabled: `
                text-muted-foreground 
                pointer-events-none 
                opacity-50 
                select-none
            `,
        }
    }
</script>

<a class={classes.default + ' ' + classes.variants[variant]} {href}>{text}</a>