<script>
    // Props
    let { 
      name, 
      value = $bindable(), 
      type = 'text'
    } = $props();

    // Default classes
    const defaultClasses = 
    "block w-full text-base lg:text-sm py-2 px-3.5 lg:py-3 lg:px-4 border border-input focus:border-input bg-background rounded-lg focus-ring transition-all";
</script>
  
<input {name} {type} class={defaultClasses} bind:value />