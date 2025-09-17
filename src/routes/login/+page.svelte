<script>
	// Import authentication components and UI elements
	import EmailPasswordSignin from '$lib/components/blocks/auth/EmailPasswordSignin.svelte';
	import ContinueWithGoogle from '$lib/components/blocks/auth/ContinueWithGoogle.svelte';
	import TextLink from '$lib/components/parts/Textlink/Textlink.svelte';
	import Separator from '$lib/components/parts/Separator/Separator.svelte';
	import Logo from '$lib/components/parts/Logo/Logo.svelte';
	import Spinner from '$lib/components/parts/Spinner/Spinner.svelte';
	import { loading } from '$lib/stores/userStore';
</script>

<!-- Show loading spinner while auth state is being determined -->
{#if $loading}
	<div role="status" class="flex h-screen flex-row items-center justify-center">
		<Spinner />
	</div>
{:else}
	<!-- Centered login form layout -->
	<div class="flex justify-center lg:h-screen lg:items-center">
		<div class="animate-fade-in-zoom w-full max-w-md p-5">
			<!-- Logo at top -->
			<div class="mb-[80px] lg:mb-10">
			    <Logo/>
            </div>
			
			<!-- Page title -->
			<h2 class="mb-9 text-2xl font-medium leading-tight text-color-foreground">Log in</h2>
            
			<div class="flex flex-col gap-5">
				<!-- Email/password login form -->
                <EmailPasswordSignin />
                
				<!-- Visual separator between login methods -->
                <div class="flex items-center gap-3">
                    <Separator />
                    <span class="text-sm text-muted-foreground">OR</span>
                    <Separator />
                </div>
                
				<!-- Google OAuth login button -->
                <ContinueWithGoogle />
                
				<!-- Link to create new account -->
                <div class="mb-8 flex justify-center lg:mb-0">
                    <TextLink href="/account" text="Create account" variant="muted" />
                </div>
            </div>
		</div>
	</div>
{/if}
