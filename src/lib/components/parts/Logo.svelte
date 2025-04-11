<script>
    // Props
    let {
        size = 28
    } = $props();

    let stringifySize = size.toString();
</script>

<picture>
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo.svg" alt="logo" class="w-{stringifySize} h-{stringifySize}"/>
</picture>