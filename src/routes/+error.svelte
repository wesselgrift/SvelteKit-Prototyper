<script>
    import { Telescope } from 'lucide-svelte';
    import Button from "$lib/components/parts/Button/Button.svelte";
</script>

<div class="h-screen w-full flex justify-center items-center flex-col gap-4 text-foreground">
    <Telescope size="40" strokeWidth="1.2" />
    <p class="font-regular text-base">
        Whoops, we couldn't find that page.
    </p>
    <Button variant="outline" width="hug" size="small" onclick={() => history.back()}>
        Go back
    </Button>
</div>