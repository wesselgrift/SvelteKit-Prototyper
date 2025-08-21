<script>
	// Import the reset password form component and UI elements
	import ResetPassword from '$lib/components/blocks/auth/ResetPassword.svelte';
	import Logo from '$lib/components/parts/Logo.svelte';
	import TextLink from '$lib/components/parts/TextLink.svelte';
</script>

<!-- Centered layout for password reset form -->
<div class="flex justify-center lg:h-screen lg:items-center">
	<div class="animate-fade-in-zoom w-full max-w-md p-5">
		<!-- Logo at top -->
		<div class="mb-[80px] lg:mb-10">
            <Logo/>
        </div>
		
		<!-- Page title -->
		<h2 class="mb-9 text-2xl font-medium leading-tight text-color-foreground">Reset Password</h2>
        
		<div class="flex flex-col gap-5">
			<!-- Reset password form component (handles email input and Firebase logic) -->
            <ResetPassword />
            
			<!-- Back to login link -->
            <div class="flex justify-center">
                <TextLink href="/login" text="Back to log in" variant="muted" />
            </div>
        </div>
	</div>
</div>