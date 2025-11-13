<script>
    // Import UI store to control page scrolling when drawer is open
    import { lockScroll } from "$lib/stores/uiStore";

    // Import Svelte lifecycle functions and browser detection
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    // Import UI components
    import Button from "$lib/components/parts/Button/Button.svelte";
    import { X } from "lucide-svelte";

    // Import animation utilities for smooth drawer transitions
	import { fly, fade } from 'svelte/transition';
	import { cubicOut, linear } from 'svelte/easing';

    // Reference to the drawer content wrapper (used for click-outside detection)
    let drawerWrapper = $state();

    // Prevent background scrolling when drawer opens
    onMount(() => {
        if (browser) {
            $lockScroll = true;
        }
    });

    // Restore background scrolling when drawer closes
    onDestroy(() => {
        if (browser) {
            $lockScroll = false;
        }
    });

    // Close drawer when user clicks outside the drawer content (on the backdrop)
    function checkClickOutside(event) {
        if (drawerWrapper && !drawerWrapper.contains(event.target)) {
            closeAction();
        }
    }

    // Component props
    let { 
        children,                    // drawer content passed as children
        title,                       // drawer title displayed in header
        closeAction = () => {}       // Function to call when drawer should close
    } = $props();

    // CSS classes for different parts of the drawer
    const classes = {
        // Semi-transparent overlay that covers the entire screen
        backdrop: `
            fixed 
            left-0 top-0 z-50
            flex 
            justify-center
            items-end
            h-dvh w-full 
            bg-black/50  
        `,
        // The actual drawer container with background and styling
        drawer: `
            block 
            flex-col 
            justify-start 
            items-start 
            w-full
            bg-popover 
            rounded-xl 
            border border-border 
            shadow-2xl 
            shadow-black/10
        `,
        // drawer header containing title and close button
        drawerHeader: `
            px-5 py-4 
            flex 
            justify-between 
            items-center 
            border-b 
            border-border
        `,
        // Styling for the drawer title text
        drawerTitle: `
            text-lg font-medium
        `,
        // Scrollable content area of the drawer
        drawerBody: `
            h-[85vh]
            p-5 
            overflow-y-auto
        `
    }
    
</script>

<!-- Drawer backdrop - semi-transparent overlay that covers the entire screen -->
<div role="presentation" class={classes.backdrop} 
    transition:fade={{
		duration: 100,
		opacity: 0,
		easing: linear
	}}
    onclick={checkClickOutside}>
    
    <!-- Main drawer container - the white box that contains the content -->
    <div class={classes.drawer} 
    transition:fly={{
		duration: 150,
        delay: 100,
		y: 50,
		opacity: 0,
		easing: cubicOut
	}}
    bind:this={drawerWrapper}>
        
        <!-- Drawer header with title and close button -->
        <div class={classes.drawerHeader}>
            <h2 class={classes.drawerTitle}>{title}</h2>
            <!-- Close button with X icon -->
            <Button variant="secondary" size="icon" width="hug" onclick={closeAction}>
                <X size={20} />
            </Button>
        </div>
        
        <!-- Drawer body - scrollable content area -->
        <div class={classes.drawerBody}>
            {@render children()}
        </div>
    </div>
</div>