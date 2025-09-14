<script>
    // Import animation utilities for smooth tooltip transitions
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    // Component props - destructured from parent component
    let {
        children,                      // Content to render inside the tooltip
        moveY = 10,                    // Vertical animation offset in pixels (positive = from below)
        moveX = 0,                     // Horizontal animation offset in pixels (positive = from right)
        position = ''                  // Additional CSS classes for positioning (top, bottom, left, right)
    } = $props();

    // Base styling for the tooltip
    // Uses inverse colors to create high contrast against the background
    const classes = {
        default: `
            absolute
            text-sm
            rounded-md
            bg-inverse
            text-inverse-foreground
            px-2
            py-1
            shadow-md
        `
    }

</script>

<!-- Tooltip container with positioning and styling -->
<!-- Positioned absolutely to float above other content with high contrast styling -->
<span class={classes.default + ' ' + position}
    transition:fly={{
        delay: 200,                 // Delay before animation starts (allows hover intent)
        duration: 150,              // Animation duration in milliseconds
        y: moveY,                   // Vertical slide distance in pixels
        x: moveX,                   // Horizontal slide distance in pixels
        opacity: 0,                 // Start transparent, fade to opaque
        easing: cubicOut            // Smooth easing curve for natural motion
    }}
>
    <!-- Render tooltip content passed as children -->
    {@render children()}
</span>