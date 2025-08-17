<script>
	import EmailPasswordSignin from '$lib/components/blocks/auth/EmailPasswordSignin.svelte';
	import ContinueWithGoogle from '$lib/components/blocks/auth/ContinueWithGoogle.svelte';
	import TextLink from '$lib/components/parts/TextLink.svelte';
	import Separator from '$lib/components/parts/Separator.svelte';
	import Logo from '$lib/components/parts/Logo.svelte';
	import Spinner from '$lib/components/parts/Spinner.svelte';
	import { loading } from '$lib/stores/userStore';

</script>

{#if $loading}
	<div role="status" class="flex h-screen flex-row items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="flex justify-center lg:h-screen lg:items-center">
		<div class="animate-fade-in-zoom w-full max-w-md p-5">
			<div class="mb-[80px] lg:mb-10">
			    <Logo/>
            </div>
			<h2 class="mb-9 text-2xl font-medium leading-tight text-color-foreground">Log in</h2>
            <div class="flex flex-col gap-5">
                <EmailPasswordSignin />
                <div class="flex items-center gap-3">
                    <Separator />
                    <span class="text-sm text-muted-foreground">OR</span>
                    <Separator />
                </div>
                <ContinueWithGoogle />
                <div class="mb-8 flex justify-center lg:mb-0">
                    <TextLink href="/account" text="Create account" variant="muted" />
                </div>
            </div>
		</div>
	</div>
{/if}
