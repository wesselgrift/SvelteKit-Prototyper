<script>
    // Accept props from parent component to configure the toggle switch
    let { 
        id,                        // Unique identifier for the input element
        name,                      // Name attribute for form submission and label text
        toggle = $bindable(),      // Boolean state - bindable allows two-way data flow with parent
        required = false,          // Whether the toggle is required for form validation
        disabled = false,          // Whether the toggle is disabled (non-interactive)
    } = $props();

    // CSS class definitions organized by component parts
    // This toggle uses a hidden checkbox with custom visual styling
    const classes = {
        // Container that holds the toggle switch and label
        wrapper: `
            inline-flex 
            items-center 
            gap-2 
            cursor-pointer
        `,
        toggle: {
            // Main visual styling for the toggle switch background and slider
            // Uses Tailwind's "peer" classes to style based on the hidden checkbox state
            default: `
                relative 
                w-11 h-6 
                bg-foreground/10 
                hover:bg-foreground/20 
                rounded-full 
                peer-focus-visible:ring 
                peer-focus-visible:ring-2 
                peer-focus-visible:ring-offset-2 
                peer-focus-visible:ring-offset-sidebar 
                peer-focus-visible:ring-ring 
                peer-checked:after:translate-x-full 
                peer-checked:after:border-white after:content-[''] 
                after:absolute 
                after:top-0.5 
                after:start-[2px] 
                after:bg-white 
                dark:peer-checked:after:bg-background 
                after:rounded-full 
                after:h-5 
                after:w-5 
                after:transition-all 
                peer-checked:bg-primary 
                transition-all`
            ,
            // Styles that override the default when the toggle is disabled
            // Makes the toggle appear muted and non-interactive
            disabled: `
                after:bg-muted-foreground/60 
                dark:after:bg-muted-foreground/60 
                peer-checked:bg-foreground/10 
                peer-checked:after:bg-muted-foreground/60 
                dark:peer-checked:after:bg-muted-foreground/60
            `
        },
        // Styling for the text label next to the toggle
        label: `
            text-sm 
            text-foreground
            select-none
        `
    }

</script>

<!-- 
    Toggle switch component structure:
    - Uses a hidden checkbox for accessibility and form handling
    - Custom visual styling creates the toggle switch appearance
    - Label wraps everything so clicking anywhere toggles the switch
-->
<label class={classes.wrapper + ' ' + (disabled ? 'pointer-events-none' : '')}>
    <!-- Hidden checkbox that handles the actual toggle state and form submission -->
    <input {id} {name} type="checkbox" class="sr-only peer" bind:checked={toggle} {required} {disabled}>
    
    <!-- Visual toggle switch - styled div that changes appearance based on checkbox state -->
    <div class={classes.toggle.default + ' ' + (disabled ? classes.toggle.disabled : '')}></div>
    
    <!-- Text label that displays the toggle name -->
    <span class={classes.label + ' ' + (disabled ? 'text-muted-foreground/80' : '')}>{name}</span>
</label>
  