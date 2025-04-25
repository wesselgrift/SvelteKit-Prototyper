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
</script>

{#snippet TabItem(title, id, state)}
    <button id={id} class="w-full py-1.5 px-3 lg:py-2 lg:px-4 rounded-md focus-ring transition-all {state ? 'bg-background' : ''}" onclick={() => handleTabClick(id)}>
        {title}
    </button>
{/snippet}

<div class="block w-full bg-muted p-1 rounded-lg flex flex-row gap-1">
    {#each items as item}
        {@render TabItem(item.title, item.id, item.state)}
    {/each}
</div>