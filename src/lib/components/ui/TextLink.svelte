<script>
    let { href, text } = $props();
</script>

<a class="text-color-primary hover:text-color-primary-hover hover:underline text-sm transition" {href}>{text}</a>