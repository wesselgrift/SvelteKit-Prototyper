<!-- 
	Component showcase page
	This page demonstrates all available UI components with working examples
-->
<script>
	// Import all UI components
	import Button from '$lib/components/parts/Button/Button.svelte';
	import Card from '$lib/components/parts/Card/Card.svelte';
	import Avatar from '$lib/components/parts/Avatar/Avatar.svelte';
	import Alert from '$lib/components/parts/Alert/Alert.svelte';
	import Input from '$lib/components/parts/Input/Input.svelte';
	import Label from '$lib/components/parts/Label/Label.svelte';
	import Logo from '$lib/components/parts/Logo/Logo.svelte';
	import Separator from '$lib/components/parts/Separator/Separator.svelte';
	import Spinner from '$lib/components/parts/Spinner/Spinner.svelte';
	import TextLink from '$lib/components/parts/Textlink/Textlink.svelte';
	import Textarea from '$lib/components/parts/Textarea/Textarea.svelte';
	import Checkbox from '$lib/components/parts/Checkbox/Checkbox.svelte';
	import Portal from '$lib/components/parts/Portal/Portal.svelte';
	import Radiobutton from '$lib/components/parts/RadioButton/RadioButton.svelte';
	import Select from '$lib/components/parts/Select/Select.svelte';
	import Toggle from '$lib/components/parts/Toggle/Toggle.svelte';
	import SidebarAccountButton from '$lib/components/parts/Sidebar/AccountButton.svelte';
	import PageTitle from '$lib/components/parts/PageTitle/PageTitle.svelte';
	import Dropdown from '$lib/components/parts/Dropdown/Dropdown.svelte';
	import MenuItem from '$lib/components/parts/Dropdown/MenuItem.svelte';
	import Tabs from '$lib/components/parts/Tabs/Tabs.svelte';
	import Modal from '$lib/components/parts/Modal/Modal.svelte';
	import Accordion from '$lib/components/parts/Accordion/Accordion.svelte';
	import Tooltip from '$lib/components/parts/Tooltip/Tooltip.svelte';
	import Badge from '$lib/components/parts/Badge/Badge.svelte';
	
	// Import icons from lucide-svelte
	import {
		X,
		Maximize2,
		Download,
		Ellipsis,
		Settings,
		ChevronDown,
		ChevronUp,
		Check,
		Folder,
		Calendar,
		TriangleAlert,
		GitMerge,
		Banana,
		Smile
	} from 'lucide-svelte';

	// Form state to demonstrate form element binding
	let formState = $state({
		textfield: 'Hey this is some value',
		textarea: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
		file: [],
		checkbox: ['This is a checkbox', 'This is another checkbox'],
		radiobutton: 'This is a radiobutton',
		select: 'Option 1',
		toggle: false
	});

	// Dropdown menu state and trigger element
	let DropDown = $state(false);
	let DropDownTrigger = $state();
	
	// Modal visibility state
	let exampleModal = $state(false);

	// Tab items configuration for the Tabs component
	let tabItems = $state([
		{
			title: 'General',
			id: 'tab1',
			state: true // Currently active tab
		},
		{
			title: 'Account',
			id: 'tab2',
			state: false
		},
		{
			title: 'Billing',
			id: 'tab3',
			state: false
		}
	]);

	// Toggle the dropdown menu open/closed
	function toggleDropDown(event) {
		event.stopPropagation();
		DropDown = !DropDown;
	}

	// Log form state to console when submitted
	function handleSubmit() {
		console.log($state.snapshot(formState));
	}

	// Tooltip state and delay timer
	let tooltip = $state(false);
	let tooltipTimeout;

	// Show tooltip after 400ms delay
	function handleMouseEnter() {
		tooltipTimeout = setTimeout(() => {
			tooltip = true;
		}, 400);
	}

	// Hide tooltip and clear delay timer
	function handleMouseLeave() {
		clearTimeout(tooltipTimeout);
		tooltip = false;
	}
</script>

<PageTitle title="Components" />

<!-- Main container: displays all components in a vertical layout with demo boxes -->
<div class="flex flex-col items-start gap-4">
	<!-- Card Component Demo -->
	<h3 class="text-lg text-muted-foreground">Card</h3>
	<div
		class="border-1 mb-4 flex w-full items-center justify-center border border-dashed border-border p-5"
	>
		<Card>
			<h2 class="mb-2 text-xl font-medium">Card</h2>
			<p>This is some content</p>
		</Card>
	</div>

	<!-- Button Component Demo: shows all button variants, sizes, and icon buttons -->
	<h3 class="text-lg text-muted-foreground">Button</h3>
	<div
		class="border-1 mb-4 flex w-full flex-col items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<!-- Regular size button variants -->
		<div class="flex w-full flex-col justify-center gap-2 xl:flex-row">
			<Button variant="primary" width="hug">Button Primary</Button>
			<Button variant="secondary" width="hug">Button Secondary</Button>
			<Button variant="outline" width="hug">Button Outline</Button>
			<Button variant="ghost" width="hug">Button Ghost</Button>
			<Button variant="disabled" width="hug">Button Disabled</Button>
		</div>
		<!-- Small size button variants -->
		<div class="flex w-full flex-col justify-center gap-2 xl:flex-row">
			<Button variant="primary" size="small" width="hug">Button Primary Small</Button>
			<Button variant="secondary" size="small" width="hug">Button Secondary Small</Button>
			<Button variant="outline" size="small" width="hug">Button Outline Small</Button>
			<Button variant="ghost" size="small" width="hug">Button Ghost Small</Button>
			<Button variant="disabled" size="small" width="hug">Button Disabled Small</Button>
		</div>
		<!-- Icon-only buttons -->
		<div class="flex w-full justify-center gap-2">
			<Button variant="primary" size="icon" width="hug"><X size={20} /></Button>
			<Button variant="secondary" size="icon" width="hug"><Maximize2 size={20} /></Button>
			<Button variant="outline" size="icon" width="hug"><Download size={20} /></Button>
			<Button variant="ghost" size="icon" width="hug"><Ellipsis size={20} /></Button>
			<Button variant="disabled" size="icon" width="hug"><Ellipsis size={20} /></Button>
		</div>
	</div>

	<!-- Tooltip Component Demo: shows on hover with 400ms delay -->
	<h3 class="text-lg text-muted-foreground">Tooltip</h3>
	<div
		class="border-1 relative mb-4 flex w-full items-center justify-center border border-dashed border-border p-5"
	>
		<Button
			variant="outline"
			width="hug"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			Hover me
		</Button>
		{#if tooltip}
			<Tooltip moveY={10} moveX={0} position="-top-5">A tooltip</Tooltip>
		{/if}
	</div>

	<h3 class="text-lg text-muted-foreground">Avatar</h3>
	<div
		class="border-1 mb-4 flex w-full flex-col items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Avatar />
	</div>

	<h3 class="text-lg text-muted-foreground">Accordion</h3>
	<div
		class="border-1 mb-4 flex w-full flex-col items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<div class="flex w-full max-w-md flex-col gap-4">
			<Accordion title="This is a title of an accordion">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam
				nostrum officia nobis soluta, laudantium delectus voluptates?
			</Accordion>
			<Accordion title="This is a title of an accordion">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam
				nostrum officia nobis soluta, laudantium delectus voluptates?
			</Accordion>
			<Accordion title="This is a title of an accordion">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam
				nostrum officia nobis soluta, laudantium delectus voluptates?
			</Accordion>
		</div>
	</div>

	<h3 class="text-lg text-muted-foreground">Alert</h3>
	<div
		class="border-1 mb-4 flex w-full flex-col items-center justify-center gap-4 border border-dashed border-border p-5 md:flex-row"
	>
		<div class="flex w-full max-w-md flex-col gap-4">
			<Alert variant="default">
				<h4 class="text-md mb-2 font-medium">This is an alert</h4>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum
				officia nobis soluta, laudantium delectus voluptates?
			</Alert>
			<Alert variant="error">
				<h4 class="text-md mb-2 font-medium">This is an alert</h4>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum, magni sunt aperiam nostrum
				officia nobis soluta, laudantium delectus voluptates?
			</Alert>
		</div>
	</div>

	<!-- Badge Component Demo: shows all badge variants with icons -->
	<h3 class="text-lg text-muted-foreground">Badge</h3>
	<div
		class="border-1 mb-4 flex w-full flex-col items-center justify-center gap-4 border border-dashed border-border p-5 md:flex-row"
	>
		<div class="flex w-full max-w-md flex-row flex-wrap gap-4">
			<Badge variant="default">
				<Check size={14} />
				This is a badge
			</Badge>
			<Badge variant="error">
				<TriangleAlert size={14} />
				This is a badge
			</Badge>
			<Badge variant="muted">
				<Banana size={14} />
				This is a badge
			</Badge>
			<Badge variant="inverse">
				<Calendar size={14} />
				This is a badge
			</Badge>
			<Badge variant="info">
				<GitMerge size={14} />
				This is a badge
			</Badge>
			<Badge variant="success">
				<Smile size={14} />
				This is a badge
			</Badge>
		</div>
	</div>

	<!-- Form Elements Demo: demonstrates all form inputs with two-way binding -->
	<h3 class="text-lg text-muted-foreground">Form elements</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<div class="flex w-full max-w-md flex-col items-start gap-4">
			<!-- Text input with binding -->
			<div class="flex w-full flex-col gap-1">
				<Label forId="textExample" label="Text" />
				<Input
					id="textExample"
					name="Text input demo"
					type="text"
					bind:value={formState.textfield}
				/>
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="myTextarea" label="Textarea" />
				<Textarea id="myTextarea" name="Text area demo" bind:value={formState.textarea} />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="myfiles" label="File" />
				<Input
					id="myfiles"
					name="File input demo"
					type="file"
					multiple="true"
					bind:value={formState.file}
				/>
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="mySelect" label="Select" />
				<Select
					id="mySelect"
					name="Select demo"
					options={['Option 1', 'Option 2', 'Option 3']}
					bind:value={formState.select}
				/>
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label label="Checkboxes" />
				<Checkbox
					id="myCheckbox"
					name="Checkbox demo"
					options={['This is a checkbox', 'This is another checkbox', 'This is a third checkbox']}
					bind:checked={formState.checkbox}
				/>
			</div>
			<div class="mb-2 flex w-full flex-col gap-1">
				<Label label="Radiobuttons" />
				<Radiobutton
					id="myRadiobutton"
					name="Radiobutton demo"
					options={[
						'This is a radiobutton',
						'This is another radiobutton',
						'This is a third radiobutton'
					]}
					bind:selected={formState.radiobutton}
				/>
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label label="Toggle" />
				<Toggle id="myToggle" name="This is a toggle" bind:toggle={formState.toggle} />
			</div>
			<Button variant="primary" width="hug" onclick={handleSubmit}>Submit form</Button>
			<p class="text-xs text-muted-foreground">Check console to see output on submit</p>
		</div>
	</div>

	<h3 class="text-lg text-muted-foreground">More input types</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<div class="flex w-full max-w-md flex-col items-start gap-4">
			<div class="flex w-full flex-col gap-1">
				<Label forId="color" label="Color" />
				<Input id="color" name="color" type="color" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="date" label="Date" />
				<Input id="date" name="date" type="date" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="datetime-local" label="Datetime-local" />
				<Input id="datetime-local" name="datetime-local" type="datetime-local" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="month" label="Month" />
				<Input id="month" name="month" type="month" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="number" label="Number" />
				<Input id="number" name="number" type="number" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="password2" label="Password" />
				<Input id="password2" name="password" type="password" />
			</div>
			<div class="flex w-full flex-col gap-3">
				<Label forId="range" label="Range" />
				<Input id="range" name="range" type="range" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="search" label="Search" />
				<Input id="search" name="search" type="search" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="tel" label="Tel" />
				<Input id="tel" name="tel" type="tel" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="time" label="Time" />
				<Input id="time" name="time" type="time" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="url" label="URL" />
				<Input id="url" name="url" type="url" />
			</div>
			<div class="flex w-full flex-col gap-1">
				<Label forId="week" label="Week" />
				<Input id="week" name="week" type="week" />
			</div>
		</div>
	</div>

	<!-- Dropdown Menu Demo: toggle dropdown with click-outside-to-close behavior -->
	<h3 class="text-lg text-muted-foreground">Dropdown Menu</h3>
	<div
		class="border-1 relative mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Button variant="outline" width="hug" bind:element={DropDownTrigger} onclick={toggleDropDown}>
			Show dropdown
			{#if DropDown}
				<ChevronUp size={18} />
			{:else}
				<ChevronDown size={18} />
			{/if}
		</Button>
		{#if DropDown}
			<Dropdown
				trigger={DropDownTrigger}
				clickOutside={toggleDropDown}
				position="w-64 top-16"
				flyInFrom={-10}
			>
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
			</Dropdown>
		{/if}
	</div>

	<!-- Modal Demo: renders in a portal with overlay, can be closed by clicking outside or X button -->
	<h3 class="text-lg text-muted-foreground">Modal</h3>
	<div
		class="border-1 relative mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Button variant="outline" width="hug" onclick={() => (exampleModal = true)}>Show modal</Button>
		{#if exampleModal}
			<Portal target="example-modal">
				<Modal title="Example modal" closeAction={() => (exampleModal = false)}>
					<p>This is an example modal</p>
				</Modal>
			</Portal>
		{/if}
	</div>

	<!-- Tabs Demo: switches content based on active tab state -->
	<h3 class="text-lg text-muted-foreground">Tabs</h3>
	<div
		class="border-1 relative mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<div class="flex w-full max-w-md flex-col gap-4">
			<Tabs bind:items={tabItems} />

			<!-- Display content based on which tab is active -->
			<Card>
				{#if tabItems.find((item) => item.state).id === 'tab1'}
					<h3 class="text-md mb-1 font-medium lg:text-lg">General</h3>
					<p class="text-foreground/70">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					</p>
				{:else if tabItems.find((item) => item.state).id === 'tab2'}
					<h3 class="text-md mb-1 font-medium lg:text-lg">Account</h3>
					<p class="text-foreground/70">
						Proin convallis nunc a dui ultricies, sit amet imperdiet nisl condimentum.
					</p>
				{:else if tabItems.find((item) => item.state).id === 'tab3'}
					<h3 class="text-md mb-1 font-medium lg:text-lg">Billing</h3>
					<p class="text-foreground/70">
						Aenean elementum elementum ipsum tempus porta. Donec nisi ante, sollicitudin a turpis
						ultricies, pharetra.
					</p>
				{/if}
			</Card>
		</div>
	</div>

	<h3 class="text-lg text-muted-foreground">Separator</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Separator />
	</div>

	<h3 class="text-lg text-muted-foreground">Logo</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Logo width="w-32" />
	</div>

	<h3 class="text-lg text-muted-foreground">Spinner</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Spinner size={8} />
	</div>

	<!-- Portal content source: this content is rendered elsewhere in the DOM -->
	<Portal target="examplePortal">
		<div class="flex w-full max-w-md flex-col items-start gap-4">
			<p>
				Hello! This content is ✨ teleported ✨ here from another component, page or layout. Use it
				for modals, tooltips (etc) that need to be rendered outside of the parent component's DOM
				hierarchy.
			</p>
		</div>
	</Portal>

	<!-- Portal Demo: renders content from above Portal component in this target location -->
	<h3 class="text-lg text-muted-foreground">Portals</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<Portal name="examplePortal" />
	</div>

	<h3 class="text-lg text-muted-foreground">Textlink</h3>
	<div
		class="border-1 mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<TextLink href="/app" text="This is a primary textlink" variant="primary" />
		<TextLink href="/app" text="This is a muted textlink" variant="muted" />
		<TextLink href="/app" text="This is a disabled textlink" variant="disabled" />
	</div>

	<h3 class="text-lg text-muted-foreground">Accountbutton with menu for sidebar</h3>
	<div
		class="border-1 relative mb-4 flex w-full flex-row items-center justify-center gap-4 border border-dashed border-border p-5"
	>
		<SidebarAccountButton />
	</div>
</div>
