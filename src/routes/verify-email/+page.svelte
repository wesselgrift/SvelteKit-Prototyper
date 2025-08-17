<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import { sendVerificationEmail, logout } from '$lib/firebase/auth';
	import Button from '$lib/components/parts/Button.svelte';
	import Logo from '$lib/components/parts/Logo.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';
	import { Check } from 'lucide-svelte';

	let userEmail = $state('');
	let emailResent = $state(false);
	let showLoading = $state(false);
	let error = $state('');
	let poll = null; // interval handle

	function stopPoll() {
		if (poll) {
			clearInterval(poll);
			poll = null;
		}
	}

	async function getCurrentUser() {
		const { default: auth } = await import('$lib/firebase/auth');
		return auth.currentUser;
	}

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

    // Here we need to make some fixes
	async function checkVerification() {
		if (!browser) return;
		try {
			const u = await getCurrentUser();
			await u.reload();
			userEmail = u.email || userEmail;

			if (u.emailVerified) {
				// stop timer before any navigation
				stopPoll();
				await ensureSession(); // make sure server session is set
				await invalidateAll(); // refresh server data
				await goto('/app', { replaceState: true }); // redirect to app client side (no server check)
			}
		} catch (err) {
			console.error(err);
		}
	}

	// On mount: set email, ensure session, and start a short poll
	$effect(() => {
		if (!browser) return;

		(async () => {
			const u = await getCurrentUser();
			userEmail = u?.email || '';
			await ensureSession();

			// make sure no previous timer lingers
			stopPoll();
			// Poll every 4s; stop when page is destroyed or redirect happens
			poll = setInterval(checkVerification, 4000);
		})();

		return () => {
			stopPoll();
		};
	});

	async function resendEmail() {
		try {
			showLoading = true;
			const u = await getCurrentUser();
			if (!u) {
				error = 'No user found. Please sign in again.';
				return;
			}
			await sendVerificationEmail(u);
			emailResent = true;
			error = '';
		} catch (err) {
			error =
				err?.code === 'auth/too-many-requests'
					? 'Too many requests. Please wait a few minutes and try again.'
					: 'Failed to send email. Please try again.';
		} finally {
			showLoading = false;
		}
	}

	// Log out and try another email
	async function tryAnotherEmail() {
		try {
			await logout('/account');
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="w-full lg:flex lg:h-screen">
	<div class="animate-fade-in-zoom flex w-full items-start justify-center lg:w-1/2 lg:items-center">
		<div class="w-full max-w-md p-5">
			<div class="mb-[80px] lg:mb-10">
				<Logo />
			</div>
			{#if error}
				<div class="mb-5">
					<Dialog variant="error">
						{error}
					</Dialog>
				</div>
			{/if}
			<h2 class="text-color-foreground mb-4 text-2xl font-medium leading-tight">
				Check your email
			</h2>
			<div class="flex flex-col items-start gap-5">
				<p class="mb-2">
					We've sent a verification email to <span class="font-medium">{userEmail}</span>. Please
					check your email and click the link to verify your account.
				</p>

				<div class="flex gap-2">
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

					<Button width="hug" variant="ghost" size="small" onclick={tryAnotherEmail}>
						Sign up with another email
					</Button>
				</div>
			</div>
		</div>
	</div>
	<div class="sign-up-img animate-fade-in flex h-[200px] w-full bg-zinc-950 p-8 lg:h-auto lg:w-1/2">
		<!-- Promo space -->
	</div>
</div>

<style>
	.sign-up-img {
		background-image: url('/abstract-img.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
