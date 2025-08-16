<script>
	// Auth and Database
	import { register, login, sendVerificationEmail } from '$lib/firebase/auth';
	import { setDocument } from '$lib/firebase/firestore';

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

	// Add these imports to your existing script block
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';

	async function handleRegister() {
		try {
			showLoading = true;

			// 1. Register the user (this sends verification email)
			const userCredential = await register(email, password);
			const userId = userCredential.user.uid;

			// 2. Try to set the user document in Firestore
			try {
				await setDocument('users', userId, {
					firstName,
					lastName,
					email
				});
			} catch (firestoreError) {
				console.error('Firestore write failed:', firestoreError);
			}

			localStorage.setItem('email', email);
			error = '';
			result = true;

			// 3. SvelteKit-native redirect
			if (browser) {
				await invalidateAll();
				await goto('/verify-email', { replaceState: true });
			}

		} catch (err) {
			console.error('Registration error:', err);

			if (err.code === 'auth/email-already-in-use') {
				error = 'This email is already registered. Try logging in instead.';
			} else if (err.code === 'auth/weak-password') {
				error = 'Password is too weak. Please choose a stronger password.';
			} else {
				error = 'Registration failed. Please try again.';
			}

			result = '';
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
    <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4">
            <div class="w-full">
                <div class="flex flex-col gap-2">
                    <Label for="firstName" label="First name" />
                    <Input name="firstName" type="text" bind:value={firstName} />
                </div>
            </div>
            <div class="w-full">
                <div class="flex flex-col gap-2">
                    <Label for="lastName" label="Last name" />
                    <Input name="lastName" type="text" bind:value={lastName} />
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <Label for="email" label="Email" />
            <Input name="email" type="email" bind:value={email} />
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <Label for="password" label="Password" />
                <Input name="password" type="password" bind:value={password} />
            </div>

            <PasswordIndicator {password} {passwordStrength} />
        </div>

        <Button type="submit">
            {#if showLoading}
                <Spinner
                    size={5}
                    spinColor="fill-primary-foreground"
                    pathColor="text-primary-foreground/10"
                />
            {/if}
            Get Started
        </Button>
    </div>
</form>
