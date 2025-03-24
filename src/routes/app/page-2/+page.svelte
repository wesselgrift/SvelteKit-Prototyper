<script>
    import { userProfile } from "$lib/stores/userStore.js"

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
</script>

<h1 class="text-2xl font-medium mb-6">Components</h1>

<div class="flex flex-col gap-4 items-start">
    <Card>
        <h2 class="text-xl font-medium mb-2">Card</h2>
        <p>This is some content</p>
    </Card>

    <Button variant="primary" width="hug">Button Primary</Button>
    <Button variant="secondary" width="hug">Button Seconday</Button>
    <Button variant="outline" width="hug">Button Outline</Button>
    <Button variant="primary" size="small" width="hug">Button Primary Small</Button>
    <Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
    <Button variant="outline" size="small" width="hug">Button Outline Small</Button>

    <Avatar userName={$userProfile.firstName}/>

    <Dialog variant="default">
        <h4 class="text-md font-medium">This is a dialog</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
    </Dialog>
    <Dialog variant="success">
        <h4 class="text-md font-medium">This is a dialog</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
    </Dialog>
    <Dialog variant="error">
        <h4 class="text-md font-medium">This is a dialog</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
    </Dialog>

    <div class="flex flex-col gap-1">
        <Label for="email" label="Email" />
        <Input name="email" type="email" />
    </div>

    <Separator />

    <Logo/>

    <Spinner />

    <TextLink href="/app" text="This is a textlink" variant="primary" />
    <TextLink href="/app" text="This is a textlink" variant="muted" />
</div>