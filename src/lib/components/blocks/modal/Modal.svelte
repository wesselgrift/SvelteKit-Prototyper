<script>
    // Stores
    import { settingsModal } from "$lib/stores/uiStore";

    // Components
    import Button from "$lib/components/parts/Button.svelte";
    import { X } from "lucide-svelte";

    // Transition
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

    // Props
    let { children, title } = $props();
    
    // Functions
    function closeModal() {
        if ($settingsModal) {
            $settingsModal = false;
        }
    }
</script>

<div role="presentation" class="absolute left-0 top-0 flex h-full w-full bg-sidebar/80 justify-center items-center z-50 p-5" 
    transition:fade={{
		duration: 200,
		opacity: 0,
		easing: cubicOut
	}}
    onclick={closeModal}>
    <div class="block flex-col justify-start items-start bg-popover rounded-xl w-full max-w-2xl border border-border shadow-2xl shadow-black/10" 
    transition:fly={{
		duration: 200,
        delay: 100,
		y: 10,
		opacity: 0,
		easing: cubicOut
	}}>
        <div class="px-5 py-4 flex justify-between items-center border-b border-border">
            <h2 class="text-lg font-medium">{title}</h2>
            <Button variant="secondary" size="icon" width="hug" onclick={closeModal}>
                <X strokeWidth={2} size={20} />
            </Button>
        </div>
        <div class="p-5 min-h-[400px] max-h-[80vh] overflow-y-auto">
            {@render children()}
        </div>
    </div>
</div>