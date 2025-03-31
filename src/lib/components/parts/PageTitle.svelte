<script>
    // Svelte, Auth and user store
    import { viewSidebar } from "$lib/stores/uiStore";
    
    // Components
    import Button from "$lib/components/parts/Button.svelte"
    import { PanelLeft } from "lucide-svelte";

    // Props
    let { title } = $props();

    // Toggle sidebar
    function toggleSidebar() {
        $viewSidebar = !$viewSidebar;
    }
</script>

<h1 class="text-xl md:text-2xl font-medium mb-6 flex flex-row items-center gap-2">
    <span role="presentation" class="block md:hidden border-r border-border pr-2 -ml-2 mr-1">
        <Button variant="ghost" size="icon" width="hug" onclick={toggleSidebar}><PanelLeft size={20} /></Button>
    </span>
    { title }
</h1>