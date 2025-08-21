<script>
	// Import Firebase authentication function for password reset functionality
	import { resetPassword } from '$lib/firebase/auth';

	// Import reusable UI components for building the form
	import Label from '$lib/components/parts/Label.svelte';
	import Input from '$lib/components/parts/Input.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';

	// Reactive state variables using Svelte 5's $state rune
	let email = $state('');                    // User's email input for password reset
	let message = $state('');                  // Success message to show user
	let messageError = $state('');             // Error message to show user
	let showLoading = $state(false);           // Loading state for button spinner

	// Handle the password reset process when user clicks the reset button
	async function handleReset() {
		try {
			// Show loading spinner while processing the request
			showLoading = true;
			
			// Call Firebase to send password reset email
			await resetPassword(email);
			
			// Show success message (generic for security - doesn't reveal if email exists)
			message = 'If there is an account linked to this email a password reset email has been sent!';
		} catch (err) {
			// If there's an error, hide loading and show error message
			showLoading = false;
			messageError = "Whoops, that doesn't work. Is this email correct?";
		} finally {
			// Always hide loading spinner when done (success or error)
			showLoading = false;
		}
	}
</script>

<!-- Main container for the password reset form -->
<div class="flex flex-col gap-5">

    <!-- Conditional message display - shows either success or error message -->
    {#if message}
        <!-- Success message in default dialog style -->
        <Dialog>
            {message}
        </Dialog>
    {:else if messageError}
        <!-- Error message in error dialog style -->
        <Dialog variant="error">
            {messageError}
        </Dialog>
    {/if}

    <!-- Email input section with label and help text -->
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
            <!-- Email input label -->
            <Label for="resetPassword" label="Email" />
            <!-- Email input field with two-way binding to email variable -->
            <Input name="resetPassword" type="email" bind:value={email} marginBottom="mb-2" />
        </div>
        <!-- Instructional text to help user understand what will happen -->
        <p class="block text-left text-muted-foreground">
            Fill in your email address and we'll send you a link to reset your password.
        </p>
    </div>

    <!-- Reset password button with loading state -->
    <Button onclick={handleReset}>
        <!-- Show spinner inside button when loading -->
        {#if showLoading}
            <Spinner
                size={5}
                spinColor="fill-primary-foreground"
                pathColor="text-primary-foreground/10"
            />
        {/if}
        Reset Password
    </Button>
</div>