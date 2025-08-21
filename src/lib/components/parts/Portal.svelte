<script>
    // Import the portals store that manages portal content across the app
    import { portals } from '$lib/stores/uiStore.js';
    import { onDestroy } from 'svelte';

    // Component props - this component works in two modes:
    // 1. Source mode: target + children (sends content to a destination)
    // 2. Destination mode: name (receives and renders content from a source)
    let { 
        target = undefined,     // Target name where content should appear (source mode)
        name = undefined,       // Portal name to render content from (destination mode)
        children                // Content to teleport (source mode only)
    } = $props();

    // Track the specific content function this instance registered
    // This prevents cleanup conflicts when multiple portals use the same target name
    let currentSnippetForTarget = null;

    // --- SOURCE MODE LOGIC ---
    // When used as a portal source: <Portal target="modal-content">{content}</Portal>
    // This registers the content to be rendered elsewhere in the DOM tree
    if (target !== undefined && children !== undefined) {
        // Store reference to this specific content function
        currentSnippetForTarget = children;

        // Register this content in the global portals store
        // Other components can now access this content by the target name
        portals.update(p => {
            p[target] = currentSnippetForTarget;
            return p;
        });

        // Clean up when this portal source component is destroyed
        onDestroy(() => {
            portals.update(p => {
                // Safety check: only remove if this instance still owns the target
                // Prevents race conditions when components mount/unmount quickly
                if (p[target] === currentSnippetForTarget) {
                    delete p[target];
                }
                return p;
            });
        });
    }

    // --- DESTINATION MODE LOGIC ---
    // When used as a portal destination: <Portal name="modal-content" />
    // This looks up and renders content that was registered by a source portal
    // Reactively updates when the portal content changes or becomes available
    const portalContent = $derived(name !== undefined ? ($portals[name] ?? null) : null);

</script>

<!-- Portal component template - renders different content based on mode -->

{#if name !== undefined}
    <!-- DESTINATION MODE: Render content from the portals store -->
    <!-- Only renders if matching portal content exists -->
    {#if portalContent}
        {@render portalContent()}
    {/if}
    
{:else if target !== undefined}
    <!-- SOURCE MODE: This portal sends content elsewhere -->
    <!-- Renders nothing here - the content appears at the destination portal -->
    <!-- The actual content teleportation happens via the store registration above -->
    
{/if}