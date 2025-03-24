<script>
    import { userProfile } from "$lib/stores/userStore";
</script>

<h2 class="text-xl font-medium mb-6">Hello world!</h2>

<p class="text-color-muted-foreground mb-2">Signed in as:</p>
<p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
<p class="mb-4">{$userProfile.email}</p>