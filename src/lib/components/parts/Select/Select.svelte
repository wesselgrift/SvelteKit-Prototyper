<script>
    // Component props for dropdown select configuration
    let {
        id,                                    // HTML id attribute for accessibility/labels
        name,                                  // Form field name for submission
        value = $bindable(),                   // Currently selected value (two-way bound to parent)
        placeholder = 'Pick an option',       // Default text shown when no option is selected
        required = false,                      // Whether user must select an option
        disabled = false,                      // Whether dropdown is disabled/read-only
        options = []                           // Array of strings - each becomes a selectable option
    } = $props();

    // CSS classes for select dropdown styling
    const classes = {
        // Standard styling for the select dropdown
        default: `
            block w-full 
            text-base lg:text-sm 
            h-9     lg:h-10
            px-3.5  lg:px-4
            py-0
            border border-input 
            focus:border-input 
            bg-background 
            rounded-lg 
            focus-ring 
            transition-all
            shadow-sm
        `,
        // Disabled state styling
        disabled: `
            disabled:cursor-default 
            disabled:bg-muted 
            disabled:border-muted 
            disabled:text-muted-foreground/70 
            disabled:pointer-events-none
        `
    }

</script>

<!-- Dropdown select element with consistent styling -->
<select {id} {name} bind:value={value} {required} {disabled} class={classes.default + ' ' + classes.disabled}>
    <!-- Default placeholder option with empty value -->
    <option value="">{placeholder}</option>
    <!-- Generate options from the options array -->
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>