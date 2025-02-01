<script>
    let { 
        href, 
        text,
        variant = 'primary',
    } = $props();


    const defaultClasses = 'text-base transition';

    const variants = {
        primary: `${defaultClasses} text-color-primary hover:text-color-primary-hover hover:underline`,
        muted: `${defaultClasses} text-color-muted-foreground hover:text-color-foreground`
    }
</script>

<a class={variants[variant]} {href}>{text}</a>