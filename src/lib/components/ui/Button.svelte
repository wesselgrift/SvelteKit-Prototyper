<script>
    let { children, type = 'button', onclick = () => {} } = $props();
</script>
  
<button 
    {type} 
    onclick={onclick}
    class="shadow-md hover:shadow-sm py-2 block text-md bg-primary-default hover:bg-primary-hover text-white w-full mb-5 rounded-lg transition focus:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:outline-none"
>
    {#if children}
        {@render children()}
    {/if}
</button>