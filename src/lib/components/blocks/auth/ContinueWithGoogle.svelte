<script>
	// Auth and Firestore
	import { loginWithGoogle } from '$lib/firebase/auth';

	// Components
	import Button from '$lib/components/parts/Button.svelte';

	async function handleGoogleLogin() {
		try {
			await loginWithGoogle();
		} catch (err) {
			console.error(err);
			error = err?.message || 'Google sign-in failed';
		}
	}
</script>

<div>
	<Button variant="outline" onclick={handleGoogleLogin}>
		<img src="/google-icon.svg" alt="Google" class="size-5" />
		Continue with Google
	</Button>
</div>
