<script>
    let {
        options, // takes an array of strings
        checked = $bindable() // this is bindable in the parent component as a boolean
    } = $props();

    let boxClasses = "focus-ring border-input cursor-pointer rounded-md size-5 bg-background hover:bg-accent/80 checked:bg-primary checked:hover:bg-primary/80 checked:focus:bg-primary checked:active:bg-primary transition-all"
    let labelClasses = "text-sm text-foreground cursor-pointer select-none"
</script>

<div class="flex flex-col gap-1">
    {#if options.length === 1}
        {#each options as option}
            <div class="flex flex-row gap-2 items-center">
                <input type="checkbox" id={option} value={option} class={boxClasses} bind:checked={checked}>
                <label for={option} class={labelClasses}>{option}</label>
            </div>
        {/each}
    {:else if options.length > 1}
        {#each options as option}
            <div class="flex flex-row gap-2 items-center">
                <input type="checkbox" id={option} value={option} class={boxClasses} bind:group={checked}>
                <label for={option} class={labelClasses}>{option}</label>
            </div>
        {/each}
    {/if}
</div>