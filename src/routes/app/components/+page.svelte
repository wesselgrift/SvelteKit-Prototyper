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
    import DropdownMenu from '$lib/components/blocks/dropdownmenu/DropdownMenu.svelte';
    import MenuItem from '$lib/components/blocks/dropdownmenu/MenuItem.svelte';
    import Tabs from '$lib/components/parts/Tabs.svelte';
    import { X, Maximize2, Download, Ellipsis, Settings, ChevronDown, ChevronUp, Folder, Calendar } from "lucide-svelte";

    import { exampleModal } from "$lib/stores/uiStore";

    let formState = $state({
        textfield: 'Hey this is some value',
        textarea: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        file: [],
        checkbox: ['This is a checkbox', 'This is another checkbox'],
        radiobutton: 'This is a radiobutton',
        select: 'Option 1',
        toggle: false
    });

    let DropDown = $state(false);
    let DropDownTrigger = $state();

    let tabItems = $state([
        {
            title: 'Tab 1', 
            id: 'tab1',
            state: true
        }, 
        {
            title: 'Tab 2', 
            id: 'tab2',
            state: false
        }, 
        {
            title: 'Tab 3', 
            id: 'tab3',
            state: false
        }
    ])

    function toggleDropDown(event) {
        event.stopPropagation();
        DropDown = !DropDown;
    }

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
        <div class="flex flex-col xl:flex-row gap-2 justify-center w-full">
            <Button variant="primary" width="hug">Button Primary</Button>
            <Button variant="secondary" width="hug">Button Secondary</Button>
            <Button variant="outline" width="hug">Button Outline</Button>
            <Button variant="ghost" width="hug">Button Ghost</Button>
            <Button variant="disabled" width="hug">Button Disabled</Button>
        </div>
        <div class="flex flex-col xl:flex-row gap-2 justify-center w-full">
            <Button variant="primary" size="small" width="hug">Button Primary Small</Button>
            <Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
            <Button variant="outline" size="small" width="hug">Button Outline Small</Button>
            <Button variant="ghost" size="small" width="hug">Button Ghost Small</Button>
            <Button variant="disabled" size="small" width="hug">Button Disabled Small</Button>
        </div>
        <div class="flex gap-2 justify-center w-full">
            <Button variant="primary" size="icon" width="hug"><X size={20} /></Button>
            <Button variant="secondary" size="icon" width="hug"><Maximize2 size={20} /></Button>
            <Button variant="outline" size="icon" width="hug"><Download size={20} /></Button>
            <Button variant="ghost" size="icon" width="hug"><Ellipsis size={20} /></Button>
            <Button variant="disabled" size="icon" width="hug"><Ellipsis size={20} /></Button>
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
                <Label forId="myTextarea" label="Textarea" />
                <Textarea id="myTextarea" name="Text area demo" bind:value={formState.textarea}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="myfiles" label="File" />
                <Input id="myfiles" name="File input demo" type="file" multiple="true" bind:value={formState.file}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="mySelect" label="Select" />
                <Select id="mySelect" name="Select demo" options={['Option 1', 'Option 2', 'Option 3']} bind:value={formState.select}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label label="Checkboxes" />
                <Checkbox id="myCheckbox" name="Checkbox demo" options={['This is a checkbox', 'This is another checkbox', 'This is a third checkbox']} bind:checked={formState.checkbox}/>
            </div>
            <div class="flex flex-col w-full gap-1 mb-2">
                <Label label="Radiobuttons" />
                <Radiobutton id="myRadiobutton" name="Radiobutton demo" options={['This is a radiobutton', 'This is another radiobutton', 'This is a third radiobutton']} bind:selected={formState.radiobutton}/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label label="Toggle" />
                <Toggle id="myToggle" name="This is a toggle" bind:toggle={formState.toggle}/>
            </div>
            <Button variant="primary" width="hug" onclick={handleSubmit}>Submit form</Button>
            <p class="text-xs text-muted-foreground">Check console to see output on submit</p>
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">More input types</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="w-full max-w-md flex flex-col gap-4 items-start">
            <div class="flex flex-col w-full gap-1">
                <Label forId="color" label="Color" />
                <Input id="color" name="color" type="color"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="date" label="Date" />
                <Input id="date" name="date" type="date"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="datetime-local" label="Datetime-local" />
                <Input id="datetime-local" name="datetime-local" type="datetime-local"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="month" label="Month" />
                <Input id="month" name="month" type="month"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="number" label="Number" />
                <Input id="number" name="number" type="number"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="password2" label="Password" />
                <Input id="password2" name="password" type="password"/>
            </div>
            <div class="flex flex-col w-full gap-3">
                <Label forId="range" label="Range" />
                <Input id="range" name="range" type="range"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="search" label="Search" />
                <Input id="search" name="search" type="search"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="tel" label="Tel" />
                <Input id="tel" name="tel" type="tel"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="time" label="Time" />
                <Input id="time" name="time" type="time"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="url" label="URL" />
                <Input id="url" name="url" type="url"/>
            </div>
            <div class="flex flex-col w-full gap-1">
                <Label forId="week" label="Week" />
                <Input id="week" name="week" type="week"/>
            </div>
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">Dropdown Menu</h3>
    <div class="relative flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Button variant="outline" width="hug" bind:element={DropDownTrigger} onclick={toggleDropDown}>
            Show dropdown
            {#if DropDown}
                <ChevronUp size={18} />
            {:else}
                <ChevronDown size={18} />
            {/if}
        </Button>
        {#if DropDown}
            <DropdownMenu trigger={DropDownTrigger} clickOutside={toggleDropDown} classes="w-64 top-20" flyInFrom={-10}>
                <MenuItem>
                    <span class="truncate">Settings</span>
                    <Folder size={18} />
                </MenuItem>
                <MenuItem>
                    <span class="truncate">This is another menu item</span>
                    <Calendar size={18} />
                </MenuItem>
                <MenuItem>
                    <span class="truncate">This is a third menu item</span>
                    <Settings size={18} />
                </MenuItem>
            </DropdownMenu>
        {/if}
    </div>

    <h3 class="text-lg text-muted-foreground">Modal</h3>
    <div class="relative flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Button variant="outline" width="hug" onclick={() => $exampleModal = true}>
            Show modal
        </Button>
    </div>

    <h3 class="text-lg text-muted-foreground">Tabs</h3>
    <div class="relative flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <div class="w-full max-w-md flex flex-col gap-4">
            <Tabs bind:items={tabItems} />

            <Card>
                {#if tabItems.find(item => item.state).title === 'Tab 1'}
                    <p>This is tab 1</p>
                {:else if tabItems.find(item => item.state).title === 'Tab 2'}
                    <p>This is tab 2</p>
                {:else if tabItems.find(item => item.state).title === 'Tab 3'}
                    <p>This is tab 3</p>
                {/if}
            </Card>
        </div>
    </div>

    <h3 class="text-lg text-muted-foreground">Separator</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Separator />
    </div>

    <h3 class="text-lg text-muted-foreground">Logo</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Logo width="w-32"/>
    </div>

    <h3 class="text-lg text-muted-foreground">Spinner</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <Spinner size={8} />
    </div>

    <h3 class="text-lg text-muted-foreground">Textlink</h3>
    <div class="flex flex-row gap-4 items-center justify-center w-full p-5 border border-1 border-dashed border-border mb-4">
        <TextLink href="/app" text="This is a primary textlink" variant="primary" />
        <TextLink href="/app" text="This is a muted textlink" variant="muted" />
        <TextLink href="/app" text="This is a disabled textlink" variant="disabled" />
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