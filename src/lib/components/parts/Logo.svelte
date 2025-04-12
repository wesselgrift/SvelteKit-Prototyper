<script>
    let {
        width = 'w-28'
    } = $props();

</script>

<picture class="block {width} h-auto">
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo.svg" alt="logo" class="w-full h-auto"/>
</picture>