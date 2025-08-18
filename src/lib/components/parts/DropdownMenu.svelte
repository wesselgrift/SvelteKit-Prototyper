<script>
	// Transition
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Lifecycle
    import { onMount, onDestroy } from 'svelte';

    // Props
	let { 
        children, 
        element = $bindable(),
        trigger,
        clickOutside = () => {},
        flyInFrom = 10,
        classes = ''
    } = $props();

    // Function to check if click is outside the component
    function handleClickOutside(event) {
        if (element && !element.contains(event.target) && !trigger.contains(event.target)) {
            clickOutside(event);
        }
    }

    // On mount add event listener to window
    onMount(() => {
        window.addEventListener('mouseup', handleClickOutside);
    });

    // On destroy remove event listener from window
    onDestroy(() => {
        window.removeEventListener('mouseup', handleClickOutside);
    });
</script>

<div class="absolute z-10 flex flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-md {classes}"
	transition:fly={{
		duration: 150,
		y: flyInFrom,
		opacity: 0,
		easing: cubicOut
	}}
    bind:this={element}
>
    {@render children()}
</div>