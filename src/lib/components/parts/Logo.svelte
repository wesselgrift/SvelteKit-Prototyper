<script>
    let {
        width = 'w-28'
    } = $props();

    const classes = {
        frame: `
            block
            h-auto
        `,
        image: `
            w-full
            h-auto
        `
    }

</script>

<picture class={classes.frame + ' ' + width}>
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo.svg" alt="logo" class={classes.image}/>
</picture>