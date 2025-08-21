<script>
    // Accept an array of tab items from the parent component
    // Using $bindable() allows the parent to modify this data and see changes reflected
    let {
        items = $bindable()
    } = $props();

    // Handle clicking on a tab - activates the clicked tab and deactivates all others
    // This ensures only one tab can be active at a time
    function handleTabClick(id) {
        items.forEach(item => {
            if (item.id === id) {
                // Set the clicked tab as active
                item.state = true;
            } else {
                // Set all other tabs as inactive
                item.state = false;
            }
        });
    }

    // CSS class definitions organized by component part
    // Using Tailwind utility classes for styling
    const classes = {
        // Container that holds all the tabs
        wrapper: `
            flex 
            flex-row gap-1
            w-full 
            bg-muted 
            p-1 
            rounded-lg 
        `,
        // Base styles applied to all tab buttons
        tab: `
            w-full 
            py-1 lg:py-1.5 
            px-3 lg:px-4 
            rounded-md 
            font-medium 
            focus-ring 
            transition-all
        `,
        // Styles for the currently active/selected tab
        tabActive: `
            bg-background 
            text-foreground 
            shadow-sm
        `,
        // Styles for inactive tabs (not currently selected)
        tabInactive: `
            bg-transparent 
            text-foreground/50 
            hover:text-foreground
        `,
    }
</script>

<!-- Reusable snippet that renders a single tab button -->
<!-- Takes the tab's title, unique id, and active state as parameters -->
{#snippet TabItem(title, id, state)}
    <button id={id} class="{state ? classes.tabActive : classes.tabInactive} {classes.tab}" onclick={() => handleTabClick(id)}>
        {title}
    </button>
{/snippet}

<!-- Main container that renders all tabs -->
<div class={classes.wrapper}>
    <!-- Loop through each item in the items array and render a tab for it -->
    {#each items as item}
        {@render TabItem(item.title, item.id, item.state)}
    {/each}
</div>