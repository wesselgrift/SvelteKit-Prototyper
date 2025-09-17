<script>
    // Component props - destructured from parent component
    let {
        href,                          // Optional URL for navigation (makes item a link)
        onclick = () => {},            // Click handler function for button behavior
        disabled = false,              // Whether the item is disabled/non-interactive
        children                       // Content to render inside the menu item
    } = $props();

    // Styling classes for different menu item states
    const classes = {
        default: `
            flex 
            w-full 
            overflow-hidden 
            rounded-lg 
            cursor-pointer 
            items-center 
            justify-between 
            gap-2 px-3 py-2 
            text-popover-foreground 
            hover-on-popover
        `,
        disabled: `
            flex 
            w-full 
            overflow-hidden 
            items-center 
            justify-between 
            gap-2 px-3 py-2 
            text-muted-foreground
        `
    }
</script>

<!-- Conditional rendering based on menu item type -->
<!-- Priority: href (link) > disabled (span) > default (button) -->

{#if href}
    <!-- Navigation link - used for menu items that navigate to other pages -->
    <a href={href} class={classes.default}>
        {@render children()}
    </a>
{:else if disabled}
    <!-- Disabled item - shows content but prevents interaction -->
    <span class={classes.disabled}>
        {@render children()}
    </span>
{:else}
    <!-- Interactive button - executes onclick function when clicked -->
    <button class={classes.default} onclick={onclick}>
        {@render children()}
    </button>
{/if}