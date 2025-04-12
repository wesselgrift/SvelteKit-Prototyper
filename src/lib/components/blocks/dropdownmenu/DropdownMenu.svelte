<script>
	// Transition
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Lifecycle
    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        window.addEventListener('mouseup', clickOutside);
    });

    onDestroy(() => {
        window.removeEventListener('mouseup', clickOutside);
    });

    // Props
	let { 
        children, 
        element = $bindable(),
        clickOutside = () => {},
        flyInFrom = 10,
        classes = ''
    } = $props();
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