<script>
    import TextLink from '$lib/components/parts/TextLink.svelte';
    import { Hand } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center justify-center h-screen">
    <Hand size={32} strokeWidth={1.5} class="mb-4" />
    <h1 class="text-lg font-medium mb-4">This can only be accessed by logged in users.</h1>
    <div class="flex flex-row gap-2 items-center">
        <TextLink href="/login" text="Log in" />
        or
        <TextLink href="/account" text="create an account" />
    </div>
</div>