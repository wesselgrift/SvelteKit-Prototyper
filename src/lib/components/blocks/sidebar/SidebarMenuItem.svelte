<script>
    let {
        href,
        onclick = () => {},
        disabled = false,
        children
    } = $props();

    const variants = {
        default: "flex w-full overflow-hidden rounded-lg cursor-pointer items-center justify-between gap-2 px-3 py-2 text-popover-foreground hover-on-popover",
        disabled: "flex w-full items-center justify-between gap-2 px-3 py-2 text-muted-foreground"
    }
</script>

{#if href}
    <a href={href} class={variants.default}>
        {@render children()}
    </a>
{:else if disabled}
    <span class={variants.disabled}>
        {@render children()}
    </span>
{:else}
    <button class={variants.default} onclick={onclick}>
        {@render children()}
    </button>
{/if}