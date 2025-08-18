<script>
    let {
        id,
        name,
        value = $bindable(),
        placeholder = 'Pick an option',
        required = false,
        disabled = false,
        options = []
    } = $props();

    const classes = {
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
        disabled: `
            disabled:cursor-default 
            disabled:bg-muted 
            disabled:border-muted 
            disabled:text-muted-foreground/70 
            disabled:pointer-events-none
        `
    }

</script>

<select {id} {name} bind:value={value} {required} {disabled} class={classes.default + ' ' + classes.disabled}>
    <option value="">{placeholder}</option>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>