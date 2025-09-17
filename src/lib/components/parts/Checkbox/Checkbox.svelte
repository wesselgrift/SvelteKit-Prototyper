<script>
    // Component props - destructured from parent component
    let {
        id,                            // HTML id attribute for the checkbox
        name,                          // HTML name attribute for form submission
        options,                       // Array of strings - checkbox labels/values
        checked = $bindable(),         // Boolean or array - bindable state for parent
        required = false,              // Whether checkbox is required for form validation
        disabled = false,              // Whether checkbox is disabled/unclickable
    } = $props();

    // Styling classes for different checkbox states and elements
    const classes = {
        checkBox: `
            focus-ring 
            border-input 
            cursor-pointer 
            rounded-md 
            size-4 
            bg-background 
            hover:bg-accent/80 
            checked:bg-primary 
            checked:hover:bg-primary/80 
            checked:focus:bg-primary 
            checked:active:bg-primary 
            transition-all
            shadow-sm
        `,
        label: `
            text-sm 
            text-foreground 
            cursor-pointer 
            select-none
        `,
        disabled: `
            disabled:cursor-default 
            disabled:bg-primary/30 
            disabled:border-input/50 
            disabled:pointer-events-none
        `
    } 
</script>

<!-- Container for all checkboxes in vertical layout -->
<div class="flex flex-col gap-1">
    <!-- Single checkbox mode - uses bind:checked for boolean value -->
    {#if options.length === 1}
        {#each options as option}
            <div class="flex flex-row gap-2 items-center">
                <input {id} {name} type="checkbox" value={option} class={classes.checkBox + ' ' + classes.disabled} bind:checked={checked} {required} {disabled}>
                <label for={id} class={classes.label + ' ' + (disabled ? 'pointer-events-none text-muted-foreground' : '')}>{option}</label>
            </div>
        {/each}
    <!-- Multiple checkbox mode - uses bind:group for array of selected values -->
    {:else if options.length > 1}
        {#each options as option, index}
            <div class="flex flex-row gap-2 items-center">
                <!-- Each checkbox gets unique id/name with index suffix -->
                <input id={`${id}-${index}`} name={`${name}-${index}`} type="checkbox" value={option} class={classes.checkBox + ' ' + classes.disabled} bind:group={checked} {required} {disabled}>
                <label for={`${id}-${index}`} class={classes.label + ' ' + (disabled ? 'pointer-events-none text-muted-foreground' : '')}>{option}</label>
            </div>
        {/each}
    {/if}
</div>

<style>
    /* Override default checkbox styling in dark mode */
    /* Ensures checkmark is visible (black) against the primary background color */
    @media (prefers-color-scheme: dark) {
        input[type="checkbox"]:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }   
    }
</style>