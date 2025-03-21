<script>
	// Auth and Navigation
	import { login } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';

	// Components
	import Label from '$lib/components/parts/Label.svelte';
	import Input from '$lib/components/parts/Input.svelte';
	import TextLink from '$lib/components/parts/TextLink.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';

	// Variables
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let showLoading = $state(false);

	$effect(() => {
		const savedEmail = localStorage.getItem('email');
		if (savedEmail) {
			email = savedEmail;
		}
	});

	async function handleLogin() {
		try {
			// Show loading indicator
			showLoading = true;

			// Login the user
			await login(email, password);

			// Store the email in local storage
			localStorage.setItem('email', email);

			// Redirect to the app
			goto('/app');
		} catch (err) {
			error = err.message;
			showLoading = false;
		} finally {
			showLoading = false;
		}
	}
</script>

{#if error}
	<div class="mb-5">
		<Dialog variant="error">
			Whoops, that didn't work. Please check if you filled in both email and password correctly.
		</Dialog>
	</div>
{/if}

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleLogin();
	}}
>
	<Label for="email" label="Email" />
	<Input name="email" type="email" bind:value={email} />

	<div class="flex flex-row justify-between">
		<Label for="password" label="Password" />
		<TextLink variant="muted" href="/reset-password" text="Forgot?" />
	</div>

	<Input name="password" type="password" bind:value={password} />

	<Button type="submit">
		{#if showLoading}
			<Spinner
				className="w-5 h-5 mr-3"
				spinColor="fill-color-primary-foreground"
				pathColor="text-color-primary-hover"
			/>
		{/if}
		Log in
	</Button>
</form>
