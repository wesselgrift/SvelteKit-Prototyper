<script>
    import { firstName, lastName, userEmail } from "$lib/stores/userStore";
    import Card from "$lib/components/parts/Card.svelte";
</script>

<h2 class="text-xl font-medium text-color-foreground mb-4">Welcome!</h2>

<Card>
    <p class="font-semibold mb-2">You signed in with the following data:</p>
    <p>First name: {$firstName}</p>
    <p>Last name: {$lastName}</p>
    <p>Email: {$userEmail}</p>
</Card>