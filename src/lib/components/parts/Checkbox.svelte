<script>
    let {
        name,
        label = 'Checkbox',
        checked = $bindable()
    } = $props();
</script>

<div class="flex flex-row gap-2 items-center">
    <input type="checkbox" id={name} name={name} bind:checked class="focus-ring border-input cursor-pointer rounded-md size-5 bg-background hover:bg-accent/80 checked:bg-primary checked:hover:bg-primary/80 checked:focus:bg-primary checked:active:bg-primary transition-all">
    <label for={name} class="text-sm text-foreground cursor-pointer select-none">{label}</label><br>
</div>