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

    // Default classes
    const defaultClasses = 
    "block w-full text-base lg:text-sm py-2 px-3.5 lg:py-3 lg:px-4 border border-input focus:border-input bg-background rounded-lg focus-ring transition-all";

    // Disabled classes
    const disabledClasses =
    "disabled:cursor-default disabled:bg-muted disabled:border-muted disabled:text-muted-foreground/70 disabled:pointer-events-none";
</script>

<select {id} {name} bind:value={value} {required} {disabled} class={defaultClasses + ' ' + disabledClasses}>
    <option value="">{placeholder}</option>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>