<script>
    // Component props for radio button group configuration
    let {
        id,                         // Base ID for generating unique IDs for each radio button
        name,                       // Base name for form grouping (each radio gets unique name)
        options,                    // Array of strings - each becomes a radio option
        selected = $bindable(),     // Currently selected value (two-way bound to parent)
        required = false,           // Whether user must select an option
        disabled = false,           // Whether entire radio group is disabled
    } = $props();

    // CSS classes for different parts of the radio button group
    const classes = {
        // Container for the entire radio button group
        groupWrapper: `
            flex flex-col 
            gap-1
        `,
        // Container for each individual radio button + label pair
        radioWrapper: `
            flex flex-row 
            gap-2 
            items-center
        `,
        // Styling for the actual radio button input
        radioButton: `
            focus-ring 
            border-input 
            cursor-pointer 
            rounded-full 
            size-4 
            bg-background 
            hover:bg-accent/80 
            checked:bg-primary 
            checked:hover:bg-primary/80 
            checked:focus:bg-primary 
            checked:active:bg-primary 
            transition-all
        `,
        // Styling for the text label next to each radio button
        label: `
            text-sm 
            text-foreground 
            cursor-pointer 
            select-none
        `,
        // Disabled state styling applied when radio group is disabled
        disabled: `
            disabled:cursor-default 
            disabled:bg-primary/30 
            disabled:border-input/50 
            disabled:pointer-events-none
        `
    }
</script>

<!-- Radio button group container -->
<div class={classes.groupWrapper}>
    <!-- Loop through each option to create individual radio buttons -->
    {#each options as option, index}
        <div class={classes.radioWrapper}>
            <input id={`${id}-${index}`} name={`${name}-${index}`} type="radio" value={option} class={classes.radioButton + ' ' + classes.disabled} bind:group={selected} {required} {disabled}>
            <label for={`${id}-${index}`} class={classes.label + ' ' + (disabled ? 'pointer-events-none text-muted-foreground' : '')}>{option}</label>
        </div>
    {/each}
</div>

<style>
    /* Dark mode styling - ensure the radio button dot is visible */
    @media (prefers-color-scheme: dark) {
        input[type="radio"]:checked {
            /* Add a black dot inside the radio button when selected in dark mode */
            background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'><circle cx='8' cy='8' r='3'/></svg>");
        }   
    }
</style>