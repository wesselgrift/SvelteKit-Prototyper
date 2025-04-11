<script>
    // Props
    let {
        size = 28
    } = $props();

</script>

<picture class="block w-{size} h-auto">
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo.svg" alt="logo" class="w-full"/>
</picture>