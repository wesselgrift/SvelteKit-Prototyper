<script>
  import Login from "$lib/components/auth/Login.svelte";
  import GoogleAuth from "$lib/components/auth/GoogleAuth.svelte";
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
</script>

<div class="flex flex-col justify-center items-center" style="padding-top: 120px;">
  <div style="max-width: 470px;" class="p-5 w-full">
    <img src="/logo.svg" alt="Google" class="h-8 mb-10" />
      <h2 class="text-3xl font-semibold mb-9 leading-tight">Sign in</h2>
      <Login />
      <div class="flex items-center gap-2 mb-5">
        <Separator />
        <span class="text-xs text-gray-400">OR</span>
        <Separator />
      </div>
      <GoogleAuth />
      <p class="w-full text-center text-sm mt-5">No account yet? <TextLink href="/account" text="Create account" /></p>
  </div>
</div>