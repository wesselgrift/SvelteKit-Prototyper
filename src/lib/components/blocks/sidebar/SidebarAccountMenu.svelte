<script>
	// Transition
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Props
	let { children, element = $bindable() } = $props();
</script>

<div class="absolute bottom-12 left-2 z-10 mb-2 flex w-[calc(100%-1rem)] flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-md"
	transition:fly={{
		duration: 150,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}
    bind:this={element}
>
    {@render children()}
</div>