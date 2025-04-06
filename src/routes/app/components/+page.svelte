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
    import Textarea from '$lib/components/parts/Textarea.svelte';
    import Checkbox from '$lib/components/parts/Checkbox.svelte';
    import Radiobutton from '$lib/components/parts/Radiobutton.svelte';
    import Select from '$lib/components/parts/Select.svelte';
    import Toggle from '$lib/components/parts/Toggle.svelte';
    import SidebarAccountButton from '$lib/components/blocks/sidebar/SidebarAccountButton.svelte';
    import PageTitle from '$lib/components/parts/PageTitle.svelte';
    import { X, Maximize2, Download, Ellipsis } from "lucide-svelte";

    let formState = $state({
        textfield: '',
        password: '',
        textarea: '',
        file: [],
        checkbox: ['This is a checkbox'],
        radiobutton: [],
        select: '',
        toggle: false
    });

    function handleSubmit() {
        console.log($state.snapshot(formState));
    }

</script>

<PageTitle title="Components" />

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
        <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
            <Button variant="primary" width="hug">Button Primary</Button>
            <Button variant="secondary" width="hug">Button Secondary</Button>
            <Button variant="outline" width="hug">Button Outline</Button>
            <Button variant="ghost" width="hug">Button Ghost</Button>
        </div>
        <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
            <Button variant="primary" size="small" width="hug">Button Primary Small</Button>
            <Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
            <Button variant="outline" size="small" width="hug">Button Outline Small</Button>
            <Button variant="ghost" size="small" width="hug">Button Ghost Small</Button>
        </div>
        <div class="flex gap-2 justify-center w-full">
            <Button variant="primary" size="icon" width="hug"><X size={20} /></Button>
            <Button variant="secondary" size="icon" width="hug"><Maximize2 size={20} /></Button>
            <Button variant="outline" size="icon" width="hug"><Download size={20} /></Button>
            <Button variant="ghost" size="icon" width="hug"><Ellipsis size={20} /></Button>
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
    <div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Dialog variant="default">
            <h4 class="text-md font-medium mb-2">This is a dialog</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
        </Dialog>
        <Dialog variant="error">
            <h4 class="text-md font-medium mb-2">This is a dialog</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum officia nobis soluta, laudantium delectus voluptates itaque nam provident! Consectetur optio mollitia quaerat, eveniet reprehenderit tempora?
        </Dialog>
    </div>

    <h3 class="text-lg text-muted-foreground">Form elements</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="w-full max-w-md flex flex-col gap-4 items-start">
            <div class="flex flex-col w-full gap-1">
                <Label forId="textExample" label="Text" />
                <Input id="textExample" name="Text input demo" type="text" bind:value={formState.textfield} />
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="passwordExample" label="Password" />
                <Input id="passwordExample" name="Password input demo" type="password" bind:value={formState.password} />
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="myTextarea" label="Textarea" />
                <Textarea disabled id="myTextarea" name="Text area demo" bind:value={formState.textarea}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="myfiles" label="File" />
                <Input id="myfiles" name="File input demo" type="file" multiple="true" bind:value={formState.file}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="mySelect" label="Select" />
                <Select disabled id="mySelect" name="Select demo" options={['Option 1', 'Option 2', 'Option 3']} bind:value={formState.select}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label label="Checkboxes" />
                <Checkbox disabled id="myCheckbox" name="Checkbox demo" options={['This is a checkbox', 'This is another checkbox', 'This is a third checkbox']} bind:checked={formState.checkbox}/>
            </div>
            <div class="flex flex-col w-full gap-1 mb-2">
                <Label label="Radiobuttons" />
                <Radiobutton id="myRadiobutton" name="Radiobutton demo" options={['This is a radiobutton', 'This is another radiobutton', 'This is a third radiobutton']} bind:selected={formState.radiobutton}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label label="Toggle" />
                <Toggle id="myToggle" name="Toggle demo" bind:toggle={formState.toggle}/>
            </div>
            <Button variant="primary" width="hug" onclick={handleSubmit}>Submit form</Button>
            <p class="text-xs text-muted-foreground">Check console to see output on submit</p>
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">All input types</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="w-full max-w-md flex flex-col gap-4 items-start">
            <div class="flex flex-col w-full gap-1">
                <Input name="color" type="color"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="date" type="date"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="datetime-local" type="datetime-local"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="month" type="month"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="number" type="number"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="password" type="password"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="range" type="range"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="search" type="search"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="tel" type="tel"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="time" type="time"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="url" type="url"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Input name="week" type="week"/>
            </div>
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