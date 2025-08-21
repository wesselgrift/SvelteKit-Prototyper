<script>
    // Accept props from parent component to configure the textarea
    let { 
        id,                        // Unique identifier for the textarea element
        name,                      // Name attribute for form submission
        value = $bindable(),       // Current text content - bindable allows two-way data flow with parent
        placeholder,               // Placeholder text shown when textarea is empty
        required = false,          // Whether the field is required for form validation
        disabled = false,          // Whether the textarea is disabled (non-interactive)
        type = 'text'             // Input type (though this is typically 'text' for textareas)
    } = $props();

    // CSS class definitions organized by state
    // Using Tailwind utility classes for consistent styling
    const classes = {
        // Base styles applied to all textareas
        default: `
            block 
            min-h-[100px] w-full 
            text-base lg:text-sm 
            py-2 lg:py-3 
            px-3.5  lg:px-4 
            border border-input focus:border-input 
            bg-background 
            rounded-lg 
            focus-ring 
            transition-all
            shadow-sm
        `,
        // Styles that only apply when the textarea is disabled
        // These override the default styles to show the field is non-interactive
        disabled: `
            disabled:cursor-default 
            disabled:bg-muted 
            disabled:border-muted 
            disabled:text-muted-foreground/70 
            disabled:pointer-events-none
        `
    }
</script>

<!-- 
    Render the textarea element with all props passed through
    - {id}, {name}, etc. are Svelte shorthand for id={id}, name={name}
    - bind:value creates two-way data binding so changes update the parent component
    - Classes are concatenated to apply both default and conditional disabled styles
-->
<textarea {id} {name} {type} {placeholder} {required} {disabled} class={classes.default + ' ' + classes.disabled} bind:value></textarea>