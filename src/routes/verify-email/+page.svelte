<script>
	// Import SvelteKit utilities and Firebase auth functions
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	// import { sendVerificationEmail, logout } from '$lib/firebase/auth';
	
	// Import UI components
	import Button from '$lib/components/parts/Button/Button.svelte';
	import Logo from '$lib/components/parts/Logo/Logo.svelte';
	import Spinner from '$lib/components/parts/Spinner/Spinner.svelte';
	import Alert from '$lib/components/parts/Alert/Alert.svelte';
	import { Check } from 'lucide-svelte';

	// Page state variables
	let userEmail = $state('');           // User's email address for display
	let emailResent = $state(false);      // Whether verification email was resent
	let showLoading = $state(false);      // Loading state for resend button
	let error = $state('');               // Error message to display
	let poll = null;                      // Timer for checking verification status

	// Stop the verification polling timer
	function stopPoll() {
		if (poll) {
			clearInterval(poll);
			poll = null;
		}
	}

	// Get the current Firebase user
	async function getCurrentUser() {
		const { default: auth } = await import('$lib/firebase/auth');
		return auth.currentUser;
	}

	// Sync Firebase auth with server session
	async function ensureSession() {
		if (!browser) return;
		const u = await getCurrentUser();
		if (!u) return;
		const idToken = await u.getIdToken(true);
		await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ idToken })
		});
	}

	// Check if user has verified their email and redirect if so
	async function checkVerification() {
		if (!browser) return;
		try {
			const u = await getCurrentUser();
			await u.reload(); // Refresh user data from Firebase
			userEmail = u.email || userEmail;

			if (u.emailVerified) {
				stopPoll(); // Stop checking once verified
				await ensureSession(); // Sync with server
				await invalidateAll(); // Refresh page data
				await goto('/app', { replaceState: true }); // Redirect to main app
			}
		} catch (err) {
			console.error(err);
		}
	}

	// Set up page when it loads: get user email, sync session, start polling
	$effect(() => {
		if (!browser) return;

		(async () => {
			const u = await getCurrentUser();
			userEmail = u?.email || '';
			await ensureSession();

			stopPoll(); // Clear any existing timer
			// Check verification status every 4 seconds
			poll = setInterval(checkVerification, 4000);
		})();

		// Cleanup timer when page unmounts
		return () => {
			stopPoll();
		};
	});

	// Resend verification email to user
	async function resendEmail() {
		try {
			showLoading = true;
			const u = await getCurrentUser();
			if (!u) {
				error = 'No user found. Please sign in again.';
				return;
			}
			const { sendVerificationEmail } = await import('$lib/firebase/auth');
			await sendVerificationEmail(u);
			emailResent = true;
			error = '';
		} catch (err) {
			// Handle specific Firebase errors
			error =
				err?.code === 'auth/too-many-requests'
					? 'Too many requests. Please wait a few minutes and try again.'
					: 'Failed to send email. Please try again.';
		} finally {
			showLoading = false;
		}
	}

	// Log out and redirect to signup with different email
	async function tryAnotherEmail() {
		try {
			const { logout } = await import('$lib/firebase/auth');
			await logout('/account');
		} catch (err) {
			console.error(err);
		}
	}
</script>

<!-- Two-column layout: form on left, image on right -->
<div class="w-full lg:flex lg:h-screen">
	<!-- Left column: verification form -->
	<div class="animate-fade-in-zoom flex w-full items-start justify-center lg:w-1/2 lg:items-center">
		<div class="w-full max-w-md p-5">
			<!-- Logo -->
			<div class="mb-[80px] lg:mb-10">
				<Logo />
			</div>
			
			<!-- Error message -->
			{#if error}
				<div class="mb-5">
					<Alert variant="error">
						{error}
					</Alert>
				</div>
			{/if}
			
			<!-- Page title and instructions -->
			<h2 class="text-color-foreground mb-4 text-2xl font-medium leading-tight">
				Check your email
			</h2>
			<div class="flex flex-col items-start gap-5">
				<p class="mb-2">
					We've sent a verification email to <span class="font-medium">{userEmail}</span>. Please
					check your email and click the link to verify your account.
				</p>

				<!-- Action buttons -->
				<div class="flex gap-2">
					<!-- Resend email button with loading/success states -->
					<Button width="hug" variant="outline" size="small" onclick={resendEmail}>
						{#if showLoading}
							<Spinner
                                size={5}
								spinColor="fill-secondary-foreground"
								pathColor="text-secondary-foreground/10"
							/>
							Resend email
						{:else if emailResent}
							<Check size={20} />
							Email resent
						{:else}
							Resend email
						{/if}
					</Button>

					<!-- Try different email button -->
					<Button width="hug" variant="ghost" size="small" onclick={tryAnotherEmail}>
						Sign up with another email
					</Button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Right column: decorative image -->
	<div class="sign-up-img animate-fade-in flex h-[200px] w-full bg-zinc-950 p-8 lg:h-auto lg:w-1/2">
		<!-- Promo space -->
	</div>
</div>

<style>
	/* Background image styling for right column */
	.sign-up-img {
		background-image: url('/abstract-img.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
