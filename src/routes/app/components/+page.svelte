<script>
    import { userProfile } from "$lib/stores/userStore";

    import Button from "$lib/components/parts/Button.svelte"
    import Card from "$lib/components/parts/Card.svelte"
    import Avatar from "$lib/components/parts/Avatar.svelte"
    import Dialog from "$lib/components/parts/Dialog.svelte"
    import Input from "$lib/components/parts/Input.svelte"
    import Label from "$lib/components/parts/Label.svelte"
    import Logo from "$lib/components/parts/Logo.svelte"
    import Separator from '$lib/components/parts/Separator.svelte';
    import Spinner from '$lib/components/parts/Spinner.svelte';
    import TextLink from '$lib/components/parts/TextLink.svelte';
    import SidebarAccountButton from '$lib/components/blocks/sidebar/SidebarAccountButton.svelte';
</script>

<h1 class="text-2xl font-medium mb-6">Components</h1>

<div class="flex flex-col gap-4 items-start">

    <h3 class="text-lg text-muted-foreground">Card</h3>
    <div class="flex items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Card>
            <h2 class="text-xl font-medium mb-2">Card</h2>
            <p>This is some content</p>
        </Card>
    </div>

    <h3 class="text-lg text-muted-foreground">Button</h3>
    <div class="flex flex-col gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="flex gap-2 justify-center w-full">
            <Button variant="primary" width="hug">Button Primary</Button>
            <Button variant="secondary" width="hug">Button Secondary</Button>
            <Button variant="outline" width="hug">Button Outline</Button>
        </div>
        <div class="flex gap-2 justify-center w-full">
            <Button variant="primary" size="small" width="hug">Button Primary Small</Button>
            <Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
            <Button variant="outline" size="small" width="hug">Button Outline Small</Button>
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">Avatar</h3>
    <div class="flex flex-col gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        {#if $userProfile.firstName}
            <Avatar userName={$userProfile.firstName}/>
        {:else}
            <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
        {/if}
    </div>

    <h3 class="text-lg text-muted-foreground">Dialog</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Dialog variant="default">
            <h4 class="text-md font-medium mb-2">This is a dialog</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
        </Dialog>
        <Dialog variant="error">
            <h4 class="text-md font-medium mb-2">This is a dialog</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
        </Dialog>
    </div>

    <h3 class="text-lg text-muted-foreground">Label and Input</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="flex flex-col gap-1">
            <Label for="email" label="Email" />
            <Input name="email" type="email" />
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">Separator</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Separator />
    </div>

    <h3 class="text-lg text-muted-foreground">Logo</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Logo/>
    </div>

    <h3 class="text-lg text-muted-foreground">Spinner</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Spinner />
    </div>

    <h3 class="text-lg text-muted-foreground">Textlink</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <TextLink href="/app" text="This is a textlink" variant="primary" />
        <TextLink href="/app" text="This is a textlink" variant="muted" />
    </div>

    <h3 class="text-lg text-muted-foreground">Accountbutton with menu for sidebar</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4 relative">
        {#if $userProfile.firstName}
            <SidebarAccountButton/>
        {:else}
            <div class="h-12 block -m-2 bg-gray-200 animate-pulse rounded-lg"></div>
        {/if}
    </div>
</div>