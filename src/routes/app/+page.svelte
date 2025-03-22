<script>
    import { userProfile } from "$lib/stores/userStore";
    import Button from "$lib/components/parts/Button.svelte"
</script>

<h2 class="text-xl font-medium mb-6">Hello world!</h2>

<p class="text-xs text-color-muted-foreground mb-2">Signed in as:</p>
<p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
<p>{$userProfile.email}</p>