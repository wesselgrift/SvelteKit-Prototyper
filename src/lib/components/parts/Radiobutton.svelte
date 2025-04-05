<script>
    let {
        options, // takes an array of strings
        selected = $bindable() // this is bindable in the parent component as a boolean
    } = $props();

    let radioClasses = "focus-ring border-input cursor-pointer rounded-full size-4 bg-background hover:bg-accent/80 checked:bg-primary checked:hover:bg-primary/80 checked:focus:bg-primary checked:active:bg-primary transition-all"
    let labelClasses = "text-sm text-foreground cursor-pointer select-none"
</script>

<div class="flex flex-col gap-1">
    {#each options as option}
        <div class="flex flex-row gap-2 items-center">
            <input type="radio" id={option} value={option} class={radioClasses} bind:group={selected}>
            <label for={option} class={labelClasses}>{option}</label>
        </div>
    {/each}
</div>

<style>
    /* Ensure dark radio dot */
    @media (prefers-color-scheme: dark) {
        input[type="radio"]:checked {
            background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'><circle cx='8' cy='8' r='3'/></svg>");
        }   
    }
</style>