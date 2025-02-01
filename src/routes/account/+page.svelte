<script>
  import EmailPasswordSignup from "$lib/components/auth/EmailPasswordSignup.svelte";
  import ContinueWithGoogle from "$lib/components/auth/ContinueWithGoogle.svelte";
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>


<div class="w-full lg:flex lg:h-screen">
  <div class="w-full flex items-start lg:w-1/2 lg:items-center justify-center">
    <div class="w-full max-w-md p-5">
      <Logo className="mb-[80px] lg:mb-10" />
      <h2 class="mb-9 text-3xl font-semibold leading-tight text-color-foreground">Create Account</h2>
      <EmailPasswordSignup />      
      <div class="mb-5 flex items-center gap-3">
        <Separator />
        <span class="text-sm text-color-muted-foreground">OR</span>
        <Separator />
      </div>
      <ContinueWithGoogle />
      <div class="flex justify-center mb-8 lg:mb-0">
        <TextLink href="/login" text="Log in" variant="muted" />
      </div>
    </div>
  </div>
  <div class="w-full flex bg-color-primary p-8 sign-up-img h-[200px] lg:h-auto lg:w-1/2">
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