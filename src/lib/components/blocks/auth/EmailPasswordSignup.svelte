<script>
	// Auth, Database and Navigation
	import { register, login } from '$lib/firebase/auth';
	import { setDocument } from '$lib/firebase/firestore';
	import { goto } from '$app/navigation';

	// Components
	import PasswordIndicator from '$lib/components/blocks/auth/PasswordIndicator.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Label from '$lib/components/parts/Label.svelte';
	import Input from '$lib/components/parts/Input.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';

	// Variables
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let result = $state('');
	let error = $state('');
	let passwordStrength = $state(0);
	let showLoading = $state(false);

	async function handleRegister() {
		try {
			showLoading = true;

			// Register the user and get the user id
			const userCredential = await register(email, password);
			const userId = userCredential.user.uid;

			error = '';
			result = true;

			localStorage.setItem('email', email);

			// Set the user document in Firestore
			await setDocument('users', userId, {
				firstName,
				lastName,
				email
			});

			// Login the user
			await login(email, password);

			// Redirect to the app
			goto('/app');
		} catch (err) {
			result = '';
			error = true;
			showLoading = false;
		} finally {
			showLoading = false;
		}
	}
</script>

{#if error}
	<div class="mb-5">
		<Dialog variant="error">
			Whoops, that didn't work. Please check if you filled in all the fields correctly.
		</Dialog>
	</div>
{/if}

<form
	class="w-full"
	onsubmit={(e) => {
		e.preventDefault();
		handleRegister();
	}}
>
	<div class="flex flex-row gap-4">
		<div class="w-full">
			<Label for="firstName" label="First name" />
			<Input name="firstName" type="text" bind:value={firstName} />
		</div>
		<div class="w-full">
			<Label for="lastName" label="Last name" />
			<Input name="lastName" type="text" bind:value={lastName} />
		</div>
	</div>

	<Label for="email" label="Email" />
	<Input name="email" type="email" bind:value={email} />

	<Label for="password" label="Password" />
	<Input name="password" type="password" marginBottom="mb-2" bind:value={password} />

	<PasswordIndicator {password} {passwordStrength} />

	<Button type="submit">
		{#if showLoading}
			<Spinner
				className="w-5 h-5 mr-3"
				spinColor="fill-color-primary-foreground"
				pathColor="text-color-primary-hover"
			/>
		{/if}
		Get Started
	</Button>
</form>
