<script>
    let { href, text } = $props();
</script>

<a class="text-primary-default hover:text-primary-hover hover:underline text-sm transition" {href}>{text}</a>