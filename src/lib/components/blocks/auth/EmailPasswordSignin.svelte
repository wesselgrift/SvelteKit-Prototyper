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
        // Prefill email if it's in local storage
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

		} catch (err) {
			error = err.message;
			showLoading = false;
		} finally {
			showLoading = false;
		}
	}
</script>

{#if error}
    <Dialog variant="error">
        Whoops, that didn't work. Please check if you filled in both email and password correctly.
    </Dialog>
{/if}

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleLogin();
	}}
>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <Label for="email" label="Email" />
            <Input name="email" type="email" bind:value={email} />
        </div>

    
        <div class="flex flex-col gap-2">
            <div class="flex flex-row justify-between">
                <Label for="password" label="Password" />
                <TextLink variant="muted" href="/reset-password" text="Forgot?" />
            </div>

            <Input name="password" type="password" bind:value={password} />
        </div>

        <Button type="submit">
            {#if showLoading}
                <Spinner
                    className="w-5 h-5 mr-3"
                    spinColor="fill-primary-foreground"
                    pathColor="text-primary-foreground/10"
                />
            {/if}
            Log in
        </Button>
    </div>
</form>
