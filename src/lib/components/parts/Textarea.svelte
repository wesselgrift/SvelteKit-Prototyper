<script>
    // Props
    let { 
        id,
        name, 
        value = $bindable(), 
        placeholder,
        required = false,
        disabled = false,
        type = 'text'
    } = $props();

    const classes = {
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
        disabled: `
            disabled:cursor-default 
            disabled:bg-muted 
            disabled:border-muted 
            disabled:text-muted-foreground/70 
            disabled:pointer-events-none
        `
    }
</script>
  
<textarea {id} {name} {type} {placeholder} {required} {disabled} class={classes.default + ' ' + classes.disabled} bind:value></textarea>