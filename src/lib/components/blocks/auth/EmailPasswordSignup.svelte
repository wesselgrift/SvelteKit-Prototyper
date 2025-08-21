<script>
	// Import Firebase authentication and database functions
	import { register, login, sendVerificationEmail } from '$lib/firebase/auth';
	import { setDocument } from '$lib/firebase/firestore';

	// Import UI components for building the signup form
	import PasswordIndicator from '$lib/components/blocks/auth/PasswordIndicator.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Label from '$lib/components/parts/Label.svelte';
	import Input from '$lib/components/parts/Input.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';

	// Import SvelteKit navigation and environment utilities
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
    import { ensureServerSession } from '$lib/firebase/auth';

	// Form data state variables using Svelte 5's $state rune
	let firstName = $state('');              // User's first name input
	let lastName = $state('');               // User's last name input
	let email = $state('');                  // User's email input
	let password = $state('');               // User's password input
	let result = $state('');                 // Success state for registration
	let error = $state('');                  // Error message to display to user
	let passwordStrength = $state(0);        // Password strength score (0-5)
	let showLoading = $state(false);         // Loading state for submit button

	// Handle user registration process with comprehensive error handling
	async function handleRegister() {
		try {
			// Show loading spinner while processing
			showLoading = true;

			// Step 1: Create Firebase user account (automatically sends verification email)
			const userCredential = await register(email, password);
			const userId = userCredential.user.uid;

			// Step 2: Save additional user data to Firestore database
			// This is wrapped in try/catch so registration can still succeed if database write fails
			try {
				await setDocument('users', userId, {
					firstName,
					lastName,
					email
				});
			} catch (firestoreError) {
				// Log the error but don't fail the entire registration
				console.error('Firestore write failed:', firestoreError);
			}

			// Store email in localStorage for use on verification page
			localStorage.setItem('email', email);
			
			// Clear any previous errors and mark registration as successful
			error = '';
			result = true;

			// Only perform navigation if we're in the browser (not during SSR)
			if (browser) {
                // Sync the session with the server
                await ensureServerSession();
				// Refresh all data on the page
				await invalidateAll();
				// Navigate to email verification page
				await goto('/verify-email', { replaceState: true });
			}

		} catch (err) {
			console.error('Registration error:', err);

			// Provide user-friendly error messages based on Firebase error codes
			if (err.code === 'auth/email-already-in-use') {
				error = 'This email is already registered. Try logging in instead.';
			} else if (err.code === 'auth/weak-password') {
				error = 'Password is too weak. Please choose a stronger password.';
			} else {
				// Fallback for any other errors
				error = 'Registration failed. Please try again.';
			}

			// Clear success state and hide loading spinner
			result = '';
			showLoading = false;
		} finally {
			// Always hide loading spinner when done (success or error)
			showLoading = false;
		}
	}
</script>

<!-- Show error message if registration failed -->
{#if error}
	<div class="mb-5">
		<Dialog variant="error">
			Whoops, that didn't work. Please check if you filled in all the fields correctly.
		</Dialog>
	</div>
{/if}

<!-- Registration form with preventDefault to handle submission via JavaScript -->
<form
	class="w-full"
	onsubmit={(e) => {
		e.preventDefault();    // Prevent default form submission
		handleRegister();      // Handle registration with our custom function
	}}
>
    <div class="flex flex-col gap-4">
        <!-- First and last name inputs in a row -->
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

        <!-- Email input -->
        <div class="flex flex-col gap-2">
            <Label for="email" label="Email" />
            <Input name="email" type="email" bind:value={email} />
        </div>

        <!-- Password input with strength indicator -->
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <Label for="password" label="Password" />
                <Input name="password" type="password" bind:value={password} />
            </div>

            <!-- Show real-time password strength feedback -->
            <PasswordIndicator {password} {passwordStrength} />
        </div>

        <!-- Submit button with loading state -->
        <Button type="submit">
            <!-- Show spinner inside button when processing registration -->
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
