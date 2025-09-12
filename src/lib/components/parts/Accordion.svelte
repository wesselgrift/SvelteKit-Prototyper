<script>
    
    // Import animation utilities for smooth dropdown transitions
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
    
    // Import icons for the accordion
    import { ChevronDown, ChevronUp } from 'lucide-svelte';

    // Component props
    let { 
        children,
        title = 'Title'
    } = $props();

    // State to control the open/closed state of the accordion
    let isOpen = $state(false);

    // Base styling for the accordion
    const classes = {
        header: `
            flex flex-row 
            justify-between items-center 
            w-full 
            hover:underline focus:underline 
            py-2
        `,
        title: `
            text-sm 
            font-medium
        `,
        content: `pb-2`,
    }
</script>

<div class="flex flex-col gap-2 w-full">
    <button class={classes.header} onclick={() => isOpen = !isOpen}>
        <h4 class={classes.title}>{title}</h4>
        {#if isOpen}
            <ChevronUp size={16} />
        {:else}
            <ChevronDown size={16} />
        {/if}
    </button>

    {#if isOpen}
        <div class={classes.content}
            transition:slide={{
                duration: 150,          // Animation duration in milliseconds
                y: 10,                  // Slide in from specified pixel offset
                opacity: 0,             // Start transparent, fade to opaque
                easing: cubicOut        // Smooth easing curve for natural motion
            }}
        >
            {@render children()}
        </div>
    {/if}
</div>


