<script>
    // Props
    let { 
        href, 
        text,
        variant = 'primary',
    } = $props();

    // Default classes
    const defaultClasses = 'transition rounded focus-ring outline-none';

    // Variants
    const variants = {
        primary: `${defaultClasses} text-primary hover:underline`,
        muted: `${defaultClasses} text-muted-foreground hover:text-foreground`,
        disabled: `${defaultClasses} text-muted-foreground pointer-events-none opacity-50 select-none`,
    }
</script>

<a class={variants[variant]} {href}>{text}</a>