<script>
	import EmailPasswordSignup from '$lib/components/blocks/auth/EmailPasswordSignup.svelte';
	import ContinueWithGoogle from '$lib/components/blocks/auth/ContinueWithGoogle.svelte';
	import TextLink from '$lib/components/parts/TextLink.svelte';
	import Separator from '$lib/components/parts/Separator.svelte';
	import Logo from '$lib/components/parts/Logo.svelte';
</script>

<div class="w-full lg:flex lg:h-screen">
	<div class="animate-fade-in-zoom flex w-full items-start justify-center lg:w-1/2 lg:items-center">
		<div class="w-full max-w-md p-5">
            <div class="mb-[80px] lg:mb-10">
			    <Logo/>
            </div>
			<h2 class="mb-9 text-2xl font-medium leading-tight text-color-foreground">Create Account</h2>
            <div class="flex flex-col gap-5">
                <EmailPasswordSignup />
                <div class="flex items-center gap-3">
                    <Separator />
                    <span class="text-sm text-color-muted-foreground">OR</span>
                    <Separator />
                </div>
                <ContinueWithGoogle />
                <div class="mb-8 flex justify-center lg:mb-0">
                    <TextLink href="/login" text="Log in" variant="muted" />
                </div>
            </div>
		</div>
	</div>
	<div class="sign-up-img animate-fade-in flex h-[200px] w-full bg-color-primary p-8 lg:h-auto lg:w-1/2">
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
