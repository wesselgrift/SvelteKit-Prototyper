<script>
    // Props
    let { 
      name,
      multiple = false,
      value = $bindable(), 
      type = 'text'
    } = $props();

    // Default classes
    const typeTextClasses = 
    "block w-full text-base lg:text-sm py-2 px-3.5 lg:py-3 lg:px-4 border border-input focus:border-input bg-background rounded-lg focus-ring transition-all";

    const typeFileClasses = 
    "block overflow-hidden w-full text-base lg:text-sm border border-input focus:border-input bg-background rounded-lg cursor-pointer focus-ring transition-all file:font-medium file:cursor-pointer file:border-0 file:py-2 file:px-3.5 lg:file:py-3 lg:file:px-4 file:mr-4 file:bg-secondary hover:file:bg-secondary-foreground/10 file:text-secondary-foreground";
</script>
  
{#if type !== 'file'}
    <input {name} {type} class={typeTextClasses} bind:value />
{:else if type === 'file'}
    <input {name} {type} class={typeFileClasses} bind:value {multiple} />
{/if}