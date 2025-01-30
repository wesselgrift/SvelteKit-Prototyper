<script>
  import Card from "$lib/components/ui/Card.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  function handleClick() {
    alert("clicked");
  }
</script>

<Card>
  <h2 class="text-3xl font-semibold">Welcome</h2>
  <p class="text-gray-500 text-sm mb-5">This is a home page</p>
  <Button variant="secondary" onclick={handleClick}>Click me</Button>
</Card>


