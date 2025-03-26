<script>
    let { 
        href, 
        text,
        variant = 'primary',
    } = $props();


    const defaultClasses = 'transition';

    const variants = {
        primary: `${defaultClasses} text-primary hover:underline`,
        muted: `${defaultClasses} text-muted-foreground hover:text-foreground`
    }
</script>

<a class={variants[variant]} {href}>{text}</a>