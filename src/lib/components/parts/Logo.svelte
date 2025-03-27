<script>
    let {
        size = "w-28"
    } = $props();
</script>

<picture>
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo.svg" alt="logo" class="{size}"/>
</picture>