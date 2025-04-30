<script>
    import { portals } from '$lib/stores/uiStore.js';
    import { onDestroy } from 'svelte';

    // The 'children' snippet prop contains the content passed between <Portal> tags
    let { target = undefined, name = undefined, children } = $props();

    // Store the specific snippet function this instance is registering, for accurate cleanup
    let currentSnippetForTarget = null;

    // --- Source Logic ---
    // If 'target' and 'children' (content) are provided, register this as a portal source.
    if (target !== undefined && children !== undefined) {
        currentSnippetForTarget = children;

        portals.update(p => {
            p[target] = currentSnippetForTarget; // Register the snippet function
            return p;
        });

        // Cleanup when the source component is destroyed
        onDestroy(() => {
            portals.update(p => {
                // Only remove the snippet if it's the one *this specific instance* registered.
                // This prevents issues if another component quickly registers the same target name.
                if (p[target] === currentSnippetForTarget) {
                    delete p[target];
                }
                return p;
            });
        });
    }

    // --- Destination Logic ---
    // If 'name' is provided, derive the content snippet from the store.
    // $portals provides reactive access to the store's value.
    // It will be null if the name doesn't exist in the store.
    const portalContent = $derived(name !== undefined ? ($portals[name] ?? null) : null);

</script>

{#if name !== undefined}
    <!-- Destination: Render the derived portal content snippet if it exists -->
    {#if portalContent}
        {@render portalContent()}
    {/if}
{:else if target !== undefined}
    <!-- Source: Renders nothing itself. Its content is teleported via the 'children' snippet. -->
{/if}