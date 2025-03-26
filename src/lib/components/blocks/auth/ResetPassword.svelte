<script>
	// Auth
	import { resetPassword } from '$lib/firebase/auth';

	// Components
	import Label from '$lib/components/parts/Label.svelte';
	import Input from '$lib/components/parts/Input.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';

	// Variables
	let email = $state('');
	let message = $state('');
	let messageError = $state('');
	let showLoading = $state(false);

	async function handleReset() {
		try {
			showLoading = true;
			await resetPassword(email);
			message = 'If there is an account linked to this email a password reset email has been sent!';
		} catch (err) {
			showLoading = false;
			messageError = "Whoops, that doesn't work. Is this email correct?";
		} finally {
			showLoading = false;
		}
	}
</script>

<div class="flex flex-col gap-5">

    {#if message}
        <Dialog>
            {message}
        </Dialog>
    {:else if messageError}
        <Dialog variant="error">
            {messageError}
        </Dialog>
    {/if}

    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
            <Label for="resetPassword" label="Email" />
            <Input name="resetPassword" type="email" bind:value={email} marginBottom="mb-2" />
        </div>
        <p class="block text-left text-muted-foreground">
            Fill in your email address and we'll send you a link to reset your password.
        </p>
    </div>

    <Button onclick={handleReset}>
        {#if showLoading}
            <Spinner
                className="w-5 h-5 mr-3"
                spinColor="fill-color-primary-foreground"
                pathColor="text-color-primary-hover"
            />
        {/if}
        Reset Password
    </Button>
</div>