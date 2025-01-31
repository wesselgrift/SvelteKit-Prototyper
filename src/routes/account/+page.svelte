<script>
  import EmailPasswordSignup from "$lib/components/auth/EmailPasswordSignup.svelte";
  import ContinueWithGoogle from "$lib/components/auth/ContinueWithGoogle.svelte";
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>


<div class="flex flex-col justify-center items-center" style="padding-top: 120px;">
  <div style="max-width: 470px;" class="p-5 w-full">
    <Logo className="mb-10" />
    <h2 class="text-3xl font-semibold mb-9 leading-tight text-color-foreground">Create Account</h2>
    <EmailPasswordSignup />      
    <div class="flex items-center gap-2 mb-5">
      <Separator />
      <span class="text-xs text-color-muted-foreground">OR</span>
      <Separator />
    </div>
    <ContinueWithGoogle />
    <p class="w-full text-center text-sm mt-5 text-color-foreground">Already signed up? <TextLink href="/login" text="Log in" /></p>
  </div>
</div>