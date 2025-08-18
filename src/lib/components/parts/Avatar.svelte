<script>
    // Store
    import { userProfile } from '$lib/stores/userStore';

    // Gradient colors
    const gradientColors = {
        1: 'from-sky-500 to-fuchsia-500',
        2: 'from-purple-500 to-indigo-500',
        3: 'from-violet-600 to-indigo-600',
        4: 'from-green-500 to-blue-500',
        5: 'from-rose-500 to-orange-300',
        6: 'from-blue-500 to-indigo-500',
        7: 'from-blue-500 to-teal-400',
    }

    // Get color index
    function getColorIndex(name) {
        if (!name) return 1; // Return a default index if name is not yet available
        const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (charSum % 7) + 1;       
    }
    
    // Calculate color index reactively
    const colorIndex = $derived(getColorIndex($userProfile.firstName));

    const classes = {
        default: `
            flex 
            size-8 
            items-center 
            justify-center 
            rounded-full 
            bg-gradient-to-tr 
            text-white
        `
    }

</script>

{#if $userProfile.firstName}
    <div class={classes.default + ' ' + gradientColors[colorIndex]}>
        {$userProfile.firstName[0]}
    </div>
{:else}
    <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
{/if}