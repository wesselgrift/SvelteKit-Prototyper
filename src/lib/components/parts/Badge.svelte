<script>
    let { 
        children,
        variant = 'default'
    } = $props();

    const classes = {
        default: `
            flex flex-row gap-1 items-center justify-start
            border
            text-xs
            font-medium
            rounded-lg
            px-2
            py-1
            w-fit
        `,
        variant: {
            default: `
                bg-background
                text-foreground
            `,
            error: `
                bg-destructive
                text-destructive-foreground
                border-destructive
            `,
            muted: `
                bg-muted
                text-muted-foreground
                border-muted
            `,
            inverse: `
                bg-inverse
                text-inverse-foreground
                border-inverse
            `,
            info: `
                bg-blue-500
                text-white 
                border-blue-500 
            `
        }
    }
</script>

<div class={classes.default + ' ' + classes.variant[variant]}>
    {@render children()}
</div>