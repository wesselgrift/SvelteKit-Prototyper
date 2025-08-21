<script>
	// Import animation utilities for smooth dropdown transitions
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Import lifecycle hooks for event listener management
    import { onMount, onDestroy } from 'svelte';

    // Component props - destructured from parent component
	let { 
        children,                      // Content to render inside the dropdown
        element = $bindable(),         // Bindable reference to the dropdown DOM element
        trigger,                       // The element that triggers the dropdown (button, etc.)
        clickOutside = () => {},       // Callback function when clicking outside
        flyInFrom = 10,                // Pixels to animate from (positive = from below)
        classes = ''                   // Additional CSS classes to apply for positioning
    } = $props();

    // Detects clicks outside the dropdown and trigger to close the menu
    // Prevents closing when clicking on the dropdown itself or its trigger
    function handleClickOutside(event) {
        if (element && !element.contains(event.target) && !trigger.contains(event.target)) {
            clickOutside(event);
        }
    }

    // Set up click-outside detection when component mounts
    onMount(() => {
        window.addEventListener('mouseup', handleClickOutside);
    });

    // Clean up event listener when component is destroyed to prevent memory leaks
    onDestroy(() => {
        window.removeEventListener('mouseup', handleClickOutside);
    });
</script>

<!-- Dropdown menu container with positioning and styling -->
<!-- Positioned absolutely to float above other content -->
<div class="absolute z-10 flex flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-md {classes}"
	transition:fly={{
		duration: 150,          // Animation duration in milliseconds
		y: flyInFrom,           // Slide in from specified pixel offset
		opacity: 0,             // Start transparent, fade to opaque
		easing: cubicOut        // Smooth easing curve for natural motion
	}}
    bind:this={element}>
    <!-- Render dropdown menu items passed as children -->
    {@render children()}
</div>