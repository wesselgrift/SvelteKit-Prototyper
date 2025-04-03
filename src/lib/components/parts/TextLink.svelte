<script>
    // Props
    let { 
        href, 
        text,
        variant = 'primary',
    } = $props();

    // Default classes
    const defaultClasses = 'transition rounded ring outline-none';

    // Variants
    const variants = {
        primary: `${defaultClasses} text-primary hover:underline`,
        muted: `${defaultClasses} text-muted-foreground hover:text-foreground`
    }
</script>

<a class={variants[variant]} {href}>{text}</a>