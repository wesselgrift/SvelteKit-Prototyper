<script>
    // Import user profile data from store
    import { userProfile } from '$lib/stores/userStore';

    // Available gradient color combinations for avatar backgrounds
    const gradientColors = {
        1: 'from-sky-500 to-fuchsia-500',
        2: 'from-purple-500 to-indigo-500',
        3: 'from-violet-600 to-indigo-600',
        4: 'from-green-500 to-blue-500',
        5: 'from-rose-500 to-orange-300',
        6: 'from-blue-500 to-indigo-500',
        7: 'from-blue-500 to-teal-400',
    }

    // Generate a consistent color index based on the user's name
    // Same name will always get the same color
    function getColorIndex(name) {
        if (!name) return 1;
        // Sum up character codes and use modulo to get index 1-7
        const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (charSum % 7) + 1;       
    }
    
    // Reactively calculate which color to use based on firstName
    const colorIndex = $derived(getColorIndex($userProfile.firstName));

    // Base styling for the avatar circle
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

<!-- Show avatar with first initial if user data is loaded -->
{#if $userProfile.firstName}
    <div class={classes.default + ' ' + gradientColors[colorIndex]}>
        {$userProfile.firstName[0]}
    </div>
{:else}
    <!-- Show loading skeleton while user data is being fetched -->
    <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
{/if}