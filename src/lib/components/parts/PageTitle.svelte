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

    const classes = {
        title: `
            fixed 
            md:relative 
            top-0 left-0 
            w-full
            flex flex-row 
            items-center gap-2 
            px-5 py-4 md:p-0 
            mb-6 
            border-b border-border md:border-none 
            text-xl md:text-2xl font-medium
            bg-background 
            z-10 
        `,
        buttonWrapper: `
            block 
            -ml-2 mr-1
            md:hidden 
            border-r border-border pr-2 
        `
    }
</script>

<h1 class={classes.title}>
    <span role="presentation" class={classes.buttonWrapper}>
        <Button variant="ghost" size="icon" width="hug" onclick={toggleSidebar}><PanelLeft size={20} /></Button>
    </span>
    { title }
</h1>