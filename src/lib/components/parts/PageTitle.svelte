<script>
    // Import UI store to control sidebar visibility
    import { viewSidebar } from "$lib/stores/uiStore";
    
    // Import UI components
    import Button from "$lib/components/parts/Button.svelte"
    import { PanelLeft } from "lucide-svelte";

    // Component props
    let { 
        title, 
        size = 'default'
    } = $props();

    // Toggle sidebar visibility on mobile devices
    function toggleSidebar() {
        $viewSidebar = !$viewSidebar;
    }

    // CSS classes for responsive page title styling
    const classes = {
        // Main title styling - responsive behavior changes between mobile and desktop
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
            font-medium
            bg-background 
            z-10                
        `,
        // Different sizes for the title
        size: {
            default: `
                text-xl md:text-2xl
            `,
            small: `
                text-lg md:text-xl
            `,
        },
        // Wrapper for the mobile menu button - only visible on mobile
        buttonWrapper: `
            block 
            -ml-2 mr-1
            md:hidden           
            border-r border-border pr-2 
        `
    }
</script>

<!-- Page title with responsive mobile menu button -->
<h1 class={classes.title + ' ' + classes.size[size]}>
    <!-- Mobile-only hamburger menu button to toggle sidebar -->
    <span role="presentation" class={classes.buttonWrapper}>
        <Button variant="ghost" size="icon" width="hug" onclick={toggleSidebar}>
            <PanelLeft size={20} />
        </Button>
    </span>
    <!-- The actual page title text -->
    { title }
</h1>