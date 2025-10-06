<script>
    // Import navigation state
	import { navigating } from '$app/state';

	// Import reusable Button component
	import Button from '$lib/components/parts/Button/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner/Spinner.svelte';
    import Alert from '$lib/components/parts/Alert/Alert.svelte';

    // Loading state for button spinner
    let handlingAuth = $state(false);
    let error = $state('');

    // Derive loading state based on handlingAuth and navigating state
    // Show spinner while processing login OR while navigating to auth-related pages
    const isLoading = $derived(handlingAuth || navigating.to?.pathname === '/app' );

	// Handle Google OAuth login process
	// This uses Firebase's built-in Google authentication provider
	async function handleGoogleLogin() {
        handlingAuth = true;
		try {
			// Trigger Google OAuth popup and handle the authentication flow
			// Firebase handles all the OAuth complexity (popup, token exchange, user creation)
			const { loginWithGoogle } = await import('$lib/firebase/auth');
			await loginWithGoogle();
			
			// Note: Successful login will trigger navigation via the auth state change
			// The app will automatically redirect based on user verification status
		} catch (err) {
			// Log the full error for debugging purposes
			console.error(err);
			
			// Set user-friendly error message (though this component doesn't display it)
			// The error variable should be declared if error display is needed
			error = err?.message || 'Google sign-in failed';
            handlingAuth = false;
		}
	}
</script>

<!-- Container for the Google sign-in button -->
<div>
	<!-- 
		Google OAuth button with outline style to differentiate from primary actions
		Uses the reusable Button component with Google branding
	-->

	<Button variant="outline" onclick={handleGoogleLogin}>
        {#if isLoading}
            <Spinner size={5}/>
        {:else}
            <img src="/google-icon.svg" alt="Google" class="size-5" />
        {/if}
		Continue with Google
	</Button>

    <!-- Show error message if login failed -->
    {#if error}
        <Alert variant="error">
            {error}
        </Alert>
    {/if}
</div>
