<script>
    import { userProfile } from "$lib/stores/userStore";
    import { LogOut, Ellipsis } from "lucide-svelte";
    
    let {
        onclick = () => {}
    } = $props();
</script>

<button onclick={onclick} class="flex flex-row justify-between items-center p-2 pr-3 -m-2 rounded-lg text-color-muted-foreground hover:text-color-foreground hover:bg-gray-200">
    <div class="flex flex-row gap-3 items-center justify-start">
        <div class="size-8 rounded-full bg-gradient-to-tr from-sky-500 to-fuchsia-500 flex items-center justify-center text-white">
            {$userProfile.firstName[0]}
        </div>
        <span>{$userProfile.firstName}</span>
    </div>
    <Ellipsis size={20} strokeWidth={2} />
</button>