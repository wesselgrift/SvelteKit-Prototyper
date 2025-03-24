<script>
    import Button from "$lib/components/parts/Button.svelte"
    import Card from "$lib/components/parts/Card.svelte"
</script>

<h1 class="text-2xl font-medium mb-6">Components</h1>

<div class="flex flex-col gap-4 items-start">
    <Card>
        <h2 class="text-xl font-medium mb-2">Card</h2>
        <p>This is some content</p>
    </Card>

    <Button variant="primary" width="hug">Button Primary</Button>
    <Button variant="secondary" width="hug">Button Seconday</Button>
    <Button variant="outline" width="hug">Button Outline</Button>
    <Button variant="primary" size="small" width="hug">Button Primary Small</Button>
    <Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
    <Button variant="outline" size="small" width="hug">Button Outline Small</Button>
</div>