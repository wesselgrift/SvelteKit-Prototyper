<script>
	// Import navigation state
	import { navigating } from '$app/state';

	// Import UI components for building the signin form
	import Label from '$lib/components/parts/Label/Label.svelte';
	import Input from '$lib/components/parts/Input/Input.svelte';
	import TextLink from '$lib/components/parts/Textlink/Textlink.svelte';
	import Button from '$lib/components/parts/Button/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner/Spinner.svelte';
	import Alert from '$lib/components/parts/Alert/Alert.svelte';

	// Form data state variables using Svelte 5's $state rune
	let email = $state('');                  // User's email input
	let password = $state('');               // User's password input
	let error = $state('');                  // Error message to display to user
	let handlingAuth = $state(false);         // Loading state for submit button

    // Derive loading state based on handlingAuth and navigating state
    // Show spinner while processing login OR while navigating to auth-related pages
    const isLoading = $derived(handlingAuth || (navigating && (navigating.to?.pathname === '/app' || navigating.to?.pathname === '/verify-email')));

	// Run once when component mounts to prefill email if user previously signed up
	// This provides a better user experience by remembering their email
	$effect(() => {
		const savedEmail = localStorage.getItem('email');
		if (savedEmail) {
			email = savedEmail;
		}
	});

	// Handle user login process with error handling
	async function handleLogin() {
		try {
			// Show loading spinner while processing login
			handlingAuth = true;

			// Attempt to log in the user with Firebase (dynamic import)
			const { login } = await import('$lib/firebase/auth');
			await login(email, password);

			// Save email to localStorage for future logins (convenience feature)
			localStorage.setItem('email', email);

			// Note: Successful login will trigger navigation via the auth state change
			// The app will automatically redirect based on user verification status

		} catch (err) {
			// Display the Firebase error message to the user
			// Firebase provides descriptive error messages like "Invalid email" or "Wrong password"
			error = err.message;
			handlingAuth = false;
		}
	}
</script>

<!-- Show error message if login failed -->
{#if error}
    <Alert variant="error">
        Whoops, that didn't work. Please check if you filled in both email and password correctly.
    </Alert>
{/if}

<!-- Login form with preventDefault to handle submission via JavaScript -->
<form
	onsubmit={(e) => {
		e.preventDefault();    // Prevent default form submission
		handleLogin();         // Handle login with our custom function
	}}
>
    <div class="flex flex-col gap-4">
        <!-- Email input field -->
        <div class="flex flex-col gap-2">
            <Label for="email" label="Email" />
            <Input name="email" type="email" bind:value={email} />
        </div>

        <!-- Password input field with forgot password link -->
        <div class="flex flex-col gap-2">
            <!-- Password label with "Forgot?" link aligned to the right -->
            <div class="flex flex-row justify-between">
                <Label for="password" label="Password" />
                <TextLink variant="muted" href="/reset-password" text="Forgot?" />
            </div>

            <Input name="password" type="password" bind:value={password} />
        </div>

        <!-- Submit button with loading state -->
        <Button type="submit">
            <!-- Show spinner inside button when processing login -->
            {#if isLoading}
                <Spinner
                    size={5}
                    spinColor="fill-primary-foreground"
                    pathColor="text-primary-foreground/10"
                />
            {/if}
            Log in
        </Button>
    </div>
</form>
