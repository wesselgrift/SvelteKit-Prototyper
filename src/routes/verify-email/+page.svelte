<script>
	// Stores, actions and navigation
	import { user, loading } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { sendVerificationEmail, logout } from '$lib/firebase/auth';

	// Components
	import Logo from '$lib/components/parts/Logo.svelte';
	import Button from '$lib/components/parts/Button.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import Dialog from '$lib/components/parts/Dialog.svelte';
	import { Check } from 'lucide-svelte';

	// Element states
	let userEmail = $state('');
	let emailResent = $state(false);
	let showLoading = $state(false);
	let error = $state('');

	// Effects
	$effect(() => {
		if ($user) {
			userEmail = $user.email;
		}
	});

	// Redirect to app if user is verified
	$effect(() => {
		if (browser && !$loading && $user?.emailVerified) {
			goto('/app');
		}
	});

	// Resend email
	async function resendEmail() {
		try {
			showLoading = true;
			await sendVerificationEmail($user);
		} catch (err) {
			error = err.message;
			showLoading = false;
		} finally {
			showLoading = false;
			emailResent = true;
			setTimeout(() => {
				emailResent = false;
			}, 3000);
		}
	}

	// Log out and try another email
	async function tryAnotherEmail() {
		try {
			await logout();
		} catch (err) {
			console.error(err);
		} finally {
			goto('/account');
		}
	}
</script>

<div class="w-full lg:flex lg:h-screen">
	<div class="animate-fade-in-zoom flex w-full items-start justify-center lg:w-1/2 lg:items-center">
		<div class="w-full max-w-md p-5">
			<div class="mb-[80px] lg:mb-10">
				<Logo/>
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
								className="size-5"
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
