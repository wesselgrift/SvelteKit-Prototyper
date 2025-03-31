<script>
    import { userProfile } from "$lib/stores/userStore";
    import PageTitle from "$lib/components/parts/PageTitle.svelte";
</script>

<PageTitle title="Hello world!" />

<p class="text-muted-foreground mb-2">Signed in as:</p>
<p class="mb-1">{$userProfile.firstName} {$userProfile.lastName}</p>
<p class="mb-1">{$userProfile.email}</p>