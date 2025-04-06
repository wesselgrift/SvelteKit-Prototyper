<script>
    let {
        id,
        name,
        options, // takes an array of strings
        checked = $bindable(), // this is bindable in the parent component as a boolean
        required = false,
        disabled = false,
    } = $props();

    let boxClasses = "focus-ring border-input cursor-pointer rounded-md size-4 bg-background hover:bg-accent/80 checked:bg-primary checked:hover:bg-primary/80 checked:focus:bg-primary checked:active:bg-primary transition-all"
    let labelClasses = "text-sm text-foreground cursor-pointer select-none"
</script>

<div class="flex flex-col gap-1">
    {#if options.length === 1}
        {#each options as option}
            <div class="flex flex-row gap-2 items-center">
                <input {id} {name} type="checkbox" value={option} class={boxClasses} bind:checked={checked} {required} {disabled}>
                <label for={id} class={labelClasses}>{option}</label>
            </div>
        {/each}
    {:else if options.length > 1}
        {#each options as option, index}
            <div class="flex flex-row gap-2 items-center">
                <input id={`${id}-${index}`} name={`${name}-${index}`} type="checkbox" value={option} class={boxClasses} bind:group={checked} {required} {disabled}>
                <label for={`${id}-${index}`} class={labelClasses}>{option}</label>
            </div>
        {/each}
    {/if}
</div>

<style>
    /* Ensure dark checkmark */
    @media (prefers-color-scheme: dark) {
        input[type="checkbox"]:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }   
    }
</style>