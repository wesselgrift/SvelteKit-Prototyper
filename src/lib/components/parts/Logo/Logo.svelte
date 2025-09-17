<script>
    // Component props for logo customization
    let {
        width = 'w-28'    // Tailwind width class (default: w-28, can be overridden)
    } = $props();

    // CSS classes for logo styling
    const classes = {
        // Container styling for the picture element
        frame: `
            block
            h-auto
        `,
        // Image styling to be responsive within its container
        image: `
            w-full
            h-auto
        `
    }

</script>

<!-- Responsive logo that switches between light/dark versions based on user's theme preference -->
<picture class={classes.frame + ' ' + width}>
  <!-- Dark mode logo - only loads when user prefers dark color scheme -->
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <!-- Default light mode logo - fallback for all other cases -->
  <img src="/logo.svg" alt="logo" class={classes.image}/>
</picture>