<script>
    import { firstName, lastName, userEmail } from "$lib/stores/userStore";
    import Card from "$lib/components/parts/Card.svelte";
</script>

<h2 class="text-xl font-medium text-color-foreground mb-4">Welcome!</h2>

<Card>
    <p class="font-medium mb-3 text-base">You signed in with the following profile, stored in the Svelte store:</p>
    <p class="mb-1"><span class="font-medium w-24 inline-block text-color-muted-foreground">First name:</span> {$firstName}</p>
    <p class="mb-1"><span class="font-medium w-24 inline-block text-color-muted-foreground">Last name:</span> {$lastName}</p>
    <p class="mb-1"><span class="font-medium w-24 inline-block text-color-muted-foreground">Email:</span> {$userEmail}</p>
</Card>