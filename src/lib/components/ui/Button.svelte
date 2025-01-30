<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
    } = $props();

    const variants = {
        primary: 'flex items-center justify-center shadow-md hover:shadow-sm py-2 block text-md bg-primary-default hover:bg-primary-hover text-white w-full mb-5 rounded-lg transition focus:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:outline-none',
        secondary: 'flex items-center justify-center py-2 block text-md text-md mb-5 block border border-slate-300 bg-white hover:border-slate-300 hover:bg-slate-50 text-black w-full rounded-lg transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:border-gray-400 focus:outline-none shadow-sm'
    }
</script>
  
<button {type} onclick={onclick} class={variants[variant]}>
    {#if children}
        {@render children()}
    {/if}
</button>