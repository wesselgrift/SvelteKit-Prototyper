<script>
    let { 
      name, 
      value = $bindable(), 
      type = 'text',
      marginBottom = 'mb-3 lg:mb-4',
    } = $props();
</script>
  
  <input
    {name}
    {type}
    class="{marginBottom} block w-full text-base py-2 px-3.5 lg:py-3 lg:px-4 border border-1 border-color-input rounded-lg transition focus:border-color-input focus:ring-2 focus:ring-color-ring focus:ring-offset-2"
    bind:value
  />