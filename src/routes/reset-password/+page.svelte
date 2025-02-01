<script>
  import ResetPassword from "$lib/components/auth/ResetPassword.svelte";
  import Logo from '$lib/components/ui/Logo.svelte';
  import TextLink from '$lib/components/ui/TextLink.svelte';
</script>
  
  
  
<div class="flex h-screen justify-center items-center">
  <div style="max-width: 470px;" class="p-5 w-full">
    <Logo className="mb-10" />
    <h2 class="text-3xl font-semibold mb-9 leading-tight text-color-foreground">Reset Password</h2>
    <ResetPassword />
    <div class="flex flex-row justify-center items-center gap-2 mt-5">
      <TextLink href="/login" text="Back to log in" variant="muted" />
    </div>
  </div>
</div>