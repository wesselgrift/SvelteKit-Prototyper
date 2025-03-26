<script>
    let { 
      name, 
      value = $bindable(), 
      type = 'text'
    } = $props();
</script>
  
  <input
    {name}
    {type}
    class="block w-full text-base lg:text-sm py-2 px-3.5 lg:py-3 lg:px-4 border border-border bg-background focus:ring-offset-background focus:border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg transition"
    bind:value
  />