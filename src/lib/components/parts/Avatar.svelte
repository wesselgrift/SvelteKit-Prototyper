<script>
    export let userName;

    const gradientColors = {
        1: 'from-sky-500 to-fuchsia-500',
        2: 'from-purple-500 to-indigo-500',
        3: 'from-violet-600 to-indigo-600',
        4: 'from-green-500 to-blue-500',
        5: 'from-rose-500 to-orange-300',
        6: 'from-blue-500 to-indigo-500',
        7: 'from-blue-500 to-teal-400',
    }

    function getColorIndex(name) {
        const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (charSum % 7) + 1;       
    }
    
    const colorIndex = getColorIndex(userName);
</script>

<div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-tr {gradientColors[colorIndex]} text-white">
    {userName[0]}
</div>