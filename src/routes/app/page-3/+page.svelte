<script>
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    function handleClick() {
        alert("clicked");
    }
</script>

<Card>
    <h1 class="text-3xl font-semibold">Page 3</h1>
    <Button variant="secondary" onclick={handleClick}>Click me</Button>
</Card>
