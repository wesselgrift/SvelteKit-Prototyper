<script>
  import EmailPasswordSignup from "$lib/components/auth/EmailPasswordSignup.svelte";
  import ContinueWithGoogle from "$lib/components/auth/ContinueWithGoogle.svelte";
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>


<div class="flex h-screen">
  <div class="w-1/2 flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center w-full">
      <div style="max-width: 470px;" class="p-5 w-full">
        <Logo className="mb-10" />
        <h2 class="text-3xl font-semibold mb-9 leading-tight text-color-foreground">Create Account</h2>
        <EmailPasswordSignup />      
        <div class="flex items-center gap-3 mb-5">
          <Separator />
          <span class="text-sm text-color-muted-foreground">OR</span>
          <Separator />
        </div>
        <ContinueWithGoogle />
        <div class="flex flex-row justify-center items-center gap-2 mt-5">
          <TextLink href="/login" text="Log in" variant="muted" />
        </div>
      </div>
    </div>
  </div>
  <div class="w-1/2 bg-color-primary p-8 flex items-end justify-start sign-up-img">
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