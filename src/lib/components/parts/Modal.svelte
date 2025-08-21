<script>
    // Import UI store to control page scrolling when modal is open
    import { lockScroll } from "$lib/stores/uiStore";

    // Import Svelte lifecycle functions and browser detection
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    // Import UI components
    import Button from "$lib/components/parts/Button.svelte";
    import { X } from "lucide-svelte";

    // Import animation utilities for smooth modal transitions
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Reference to the modal content wrapper (used for click-outside detection)
    let modalWrapper = $state();

    // Prevent background scrolling when modal opens
    onMount(() => {
        if (browser) {
            $lockScroll = true;
        }
    });

    // Restore background scrolling when modal closes
    onDestroy(() => {
        if (browser) {
            $lockScroll = false;
        }
    });

    // Close modal when user clicks outside the modal content (on the backdrop)
    function checkClickOutside(event) {
        if (modalWrapper && !modalWrapper.contains(event.target)) {
            closeAction();
        }
    }

    // Component props
    let { 
        children,                    // Modal content passed as children
        title,                       // Modal title displayed in header
        closeAction = () => {}       // Function to call when modal should close
    } = $props();

    // CSS classes for different parts of the modal
    const classes = {
        // Semi-transparent overlay that covers the entire screen
        backdrop: `
            fixed 
            left-0 top-0 z-50 p-5
            flex 
            justify-center
            items-center
            h-dvh w-full 
            bg-sidebar/80  
        `,
        // The actual modal container with background and styling
        modal: `
            block 
            flex-col 
            justify-start 
            items-start 
            w-full max-w-2xl
            bg-popover 
            rounded-xl 
            border border-border 
            shadow-2xl 
            shadow-black/10
        `,
        // Modal header containing title and close button
        modalHeader: `
            px-5 py-4 
            flex 
            justify-between 
            items-center 
            border-b 
            border-border
        `,
        // Styling for the modal title text
        modalTitle: `
            text-lg font-medium
        `,
        // Scrollable content area of the modal
        modalBody: `
            min-h-[400px] max-h-[80vh] 
            p-5 
            overflow-y-auto
        `
    }
    
</script>

<!-- Modal backdrop - semi-transparent overlay that covers the entire screen -->
<div role="presentation" class={classes.backdrop} 
    transition:fade={{
		duration: 200,
		opacity: 0,
		easing: cubicOut
	}}
    onclick={checkClickOutside}>
    
    <!-- Main modal container - the white box that contains the content -->
    <div class={classes.modal} 
    transition:fly={{
		duration: 200,
        delay: 100,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}
    bind:this={modalWrapper}>
        
        <!-- Modal header with title and close button -->
        <div class={classes.modalHeader}>
            <h2 class={classes.modalTitle}>{title}</h2>
            <!-- Close button with X icon -->
            <Button variant="secondary" size="icon" width="hug" onclick={closeAction}>
                <X size={20} />
            </Button>
        </div>
        
        <!-- Modal body - scrollable content area -->
        <div class={classes.modalBody}>
            {@render children()}
        </div>
    </div>
</div>