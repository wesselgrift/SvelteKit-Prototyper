<script>
	import ResetPassword from '$lib/components/blocks/auth/ResetPassword.svelte';
	import Logo from '$lib/components/parts/Logo.svelte';
	import TextLink from '$lib/components/parts/TextLink.svelte';
</script>

<div class="flex justify-center lg:h-screen lg:items-center">
	<div class="animate-fade-in-zoom w-full max-w-md p-5">
		<div class="mb-[80px] lg:mb-10">
            <Logo/>
        </div>
		<h2 class="mb-9 text-2xl font-medium leading-tight text-color-foreground">Reset Password</h2>
        <div class="flex flex-col gap-5">
            <ResetPassword />
            <div class="flex justify-center">
                <TextLink href="/login" text="Back to log in" variant="muted" />
            </div>
        </div>
	</div>
</div>