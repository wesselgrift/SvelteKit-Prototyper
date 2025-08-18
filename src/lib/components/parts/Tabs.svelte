<script>
    let {
        items = $bindable()
    } = $props();

    function handleTabClick(id) {
        items.forEach(item => {
            if (item.id === id) {
                item.state = true;
            } else {
                item.state = false;
            }
        });
    }

    const classes = {
        wrapper: `
            flex 
            flex-row gap-1
            w-full 
            bg-muted 
            p-1 
            rounded-lg 
        `,
        tab: `
            w-full 
            py-1 lg:py-1.5 
            px-3 lg:px-4 
            rounded-md 
            font-medium 
            focus-ring 
            transition-all
        `,
        tabActive: `
            bg-background 
            text-foreground 
            shadow-sm
        `,
        tabInactive: `
            bg-transparent 
            text-foreground/50 
            hover:text-foreground
        `,
    }
</script>

{#snippet TabItem(title, id, state)}
    <button id={id} class="{state ? classes.tabActive : classes.tabInactive} {classes.tab}" onclick={() => handleTabClick(id)}>
        {title}
    </button>
{/snippet}

<div class={classes.wrapper}>
    {#each items as item}
        {@render TabItem(item.title, item.id, item.state)}
    {/each}
</div>