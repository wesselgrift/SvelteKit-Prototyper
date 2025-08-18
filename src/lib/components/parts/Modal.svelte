<script>
    // Stores
    import { lockScroll } from "$lib/stores/uiStore";

    // Lifecycle
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    // Components
    import Button from "$lib/components/parts/Button.svelte";
    import { X } from "lucide-svelte";

    // Transition
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Modal wrapper
    let modalWrapper = $state();

    // Lock scroll when modal is open
    onMount(() => {
        if (browser) {
            $lockScroll = true;
        }
    });

    // Unlock scroll when modal is closed
    onDestroy(() => {
        if (browser) {
            $lockScroll = false;
        }
    });

    // Check if the click is outside the ModalWrapper and on the backdrop
    function checkClickOutside(event) {
        if (modalWrapper && !modalWrapper.contains(event.target)) {
            closeAction();
        }
    }

    // Props
    let { 
        children, 
        title, 
        closeAction = () => {} 
    } = $props();

    const classes = {
        backdrop: `
            fixed 
            left-0 top-0 z-50 p-5
            flex 
            justify-center
            items-center
            h-dvh w-full 
            bg-sidebar/80  
        `,
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
        modalHeader: `
            px-5 py-4 
            flex 
            justify-between 
            items-center 
            border-b 
            border-border
        `,
        modalTitle: `
            text-lg font-medium
        `,
        modalBody: `
            min-h-[400px] max-h-[80vh] 
            p-5 
            overflow-y-auto
        `
    }
    
</script>

<div role="presentation" class={classes.backdrop} 
    transition:fade={{
		duration: 200,
		opacity: 0,
		easing: cubicOut
	}}
    onclick={checkClickOutside}>
    <div class={classes.modal} 
    transition:fly={{
		duration: 200,
        delay: 100,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}
    bind:this={modalWrapper}
    >
        <div class={classes.modalHeader}>
            <h2 class={classes.modalTitle}>{title}</h2>
            <Button variant="secondary" size="icon" width="hug" onclick={closeAction}>
                <X size={20} />
            </Button>
        </div>
        <div class={classes.modalBody}>
            {@render children()}
        </div>
    </div>
</div>