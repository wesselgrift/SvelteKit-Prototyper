<script>
    import { userProfile } from "$lib/stores/userStore";
    import Card from "$lib/components/parts/Card.svelte";
</script>

<h2 class="text-xl font-medium mb-4">Hello world!</h2>
<p class="mb-4">This small boilerplate uses SvelteKit, Firebase and Firestore to serve up an empty web app with auth.</p>

<p class="mb-1"><span class="w-48 inline-block text-color-muted-foreground">$userProfile.firstName:</span> {$userProfile.firstName}</p>
<p class="mb-1"><span class="w-48 inline-block text-color-muted-foreground">$userProfile.lastName:</span> {$userProfile.lastName}</p>
<p class="mb-1"><span class="w-48 inline-block text-color-muted-foreground">$userProfile.email:</span> {$userProfile.email}</p>