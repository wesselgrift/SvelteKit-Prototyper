<script>
    import { firstName, lastName, userEmail } from "$lib/stores/userStore";
</script>

<h2 class="text-xl font-medium text-color-foreground">Welcome!</h2>
<p class="mb-4">You signed in with the following data:</p>

<p>First name: {$firstName}</p>
<p>Last name: {$lastName}</p>
<p>Email: {$userEmail}</p>