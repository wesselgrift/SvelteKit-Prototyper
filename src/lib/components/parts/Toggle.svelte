<script>
    let { 
        id,
        name,
        toggle = $bindable(),
        required = false,
        disabled = false,
    } = $props();

    const classes = {
        wrapper: `
            inline-flex 
            items-center 
            gap-2 
            cursor-pointer
        `,
        toggle: {
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
            disabled: `
                after:bg-muted-foreground/60 
                dark:after:bg-muted-foreground/60 
                peer-checked:bg-foreground/10 
                peer-checked:after:bg-muted-foreground/60 
                dark:peer-checked:after:bg-muted-foreground/60
            `
        },
        label: `
            text-sm 
            text-foreground
            select-none
        `
    }

</script>


<label class={classes.wrapper + ' ' + (disabled ? 'pointer-events-none' : '')}>
    <input {id} {name} type="checkbox" class="sr-only peer" bind:checked={toggle} {required} {disabled}>
    <div class={classes.toggle.default + ' ' + (disabled ? classes.toggle.disabled : '')}></div>
    <span class={classes.label + ' ' + (disabled ? 'text-muted-foreground/80' : '')}>{name}</span>
</label>
  