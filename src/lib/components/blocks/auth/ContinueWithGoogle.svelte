<script>
	// Import Firebase Google authentication function
	// import { loginWithGoogle } from '$lib/firebase/auth';

	// Import reusable Button component
	import Button from '$lib/components/parts/Button.svelte';

	// Handle Google OAuth login process
	// This uses Firebase's built-in Google authentication provider
	async function handleGoogleLogin() {
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
		<img src="/google-icon.svg" alt="Google" class="size-5" />
		Continue with Google
	</Button>
</div>
