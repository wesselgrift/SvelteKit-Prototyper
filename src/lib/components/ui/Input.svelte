<script>
    let { name, value = $bindable(), type = 'text' } = $props();
</script>
  
  <input
    {name}
    {type}
    class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400"
    bind:value
  />