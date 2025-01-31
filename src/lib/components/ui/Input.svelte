<script>
    let { name, value = $bindable(), type = 'text' } = $props();
</script>
  
  <input
    {name}
    {type}
    class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-color-input focus:border-color-input rounded-md transition focus:ring-2 focus:ring-color-ring focus:ring-offset-2"
    bind:value
  />