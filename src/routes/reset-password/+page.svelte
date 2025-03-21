<script>
  import ResetPassword from "$lib/components/auth/ResetPassword.svelte";
  import Logo from '$lib/components/ui/Logo.svelte';
  import TextLink from '$lib/components/ui/TextLink.svelte';
</script>
  
<div class="flex lg:h-screen justify-center lg:items-center">
  <div class="p-5 w-full max-w-md animate-fade-in-zoom">
    <Logo className="mb-[80px] lg:mb-10" />
    <h2 class="text-2xl font-medium mb-9 leading-tight text-color-foreground">Reset Password</h2>
    <ResetPassword />
    <div class="flex justify-center mb-8 lg:mb-0">
      <TextLink href="/login" text="Back to log in" variant="muted" />
    </div>
  </div>
</div>