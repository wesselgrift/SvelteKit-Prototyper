<script>
    import { firstName, lastName, userEmail } from "$lib/stores/userStore";
    import Card from "$lib/components/parts/Card.svelte";
</script>

<h2 class="text-xl font-medium text-color-foreground">Welcome!</h2>
<p class="mb-4 text-sm">You signed in with the following data:</p>

<Card>
    <p>First name: {$firstName}</p>
    <p>Last name: {$lastName}</p>
    <p>Email: {$userEmail}</p>
</Card>