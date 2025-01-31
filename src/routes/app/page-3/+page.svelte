<script>
    import Button from "$lib/components/ui/Button.svelte";

    function handleClick() {
        alert("clicked");
    }
</script>

<h1 class="text-2xl font-semibold mb-5 text-color-foreground">Page 3</h1>
<div class="w-64">
    <Button variant="secondary" onclick={handleClick}>Click me</Button>
</div>