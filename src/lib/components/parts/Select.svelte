<script>
    let {
        name,
        placeholder = 'Pick an option',
        value = $bindable(),
        options = []
    } = $props();
    
    // Default classes
    const defaultClasses = 
    "block w-full text-base lg:text-sm py-2 px-3.5 lg:py-3 lg:px-4 border border-input focus:border-input bg-background rounded-lg focus-ring transition-all";
</script>

<select id={name} bind:value={value} class={defaultClasses}>
    <option value="">{placeholder}</option>
    {#each options as option}
            <option value={option}>{option}</option>
    {/each}
</select>