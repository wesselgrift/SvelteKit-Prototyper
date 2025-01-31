<script>
  import EmailPasswordSignin from "$lib/components/auth/EmailPasswordSignin.svelte";
  import ContinueWithGoogle from "$lib/components/auth/ContinueWithGoogle.svelte";
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import { onDestroy } from "svelte";
  import { user, loading } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  let currentUser = $state();

  const unsubscribe = user.subscribe((val) => {
    currentUser = val;

    if (currentUser && typeof window !== 'undefined') {
      goto("/app");
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
  
</script>

{#if $loading}
  <div role="status" class="flex flex-row justify-center items-center gap-2 h-screen">
    <Spinner />
  </div>
{:else if !$loading && !currentUser}
    <div class="flex h-screen flex-col justify-center items-center">
      <div style="max-width: 470px;" class="p-5 w-full">
        <Logo className="mb-10" />
          <h2 class="text-3xl font-semibold mb-9 leading-tight text-color-foreground">Sign in</h2>
          <EmailPasswordSignin />
          <div class="flex items-center gap-2 mb-5">
            <Separator />
            <span class="text-xs text-color-muted-foreground">OR</span>
            <Separator />
          </div>
          <ContinueWithGoogle />
          <p class="w-full text-center text-sm mt-5 text-color-foreground">No account yet? <TextLink href="/account" text="Create account" /></p>
      </div>
    </div>
{/if}