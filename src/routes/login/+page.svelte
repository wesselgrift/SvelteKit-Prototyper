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
  <div role="status" class="flex flex-row justify-center items-center h-screen">
    <Spinner />
  </div>
{:else if !$loading && !currentUser}
    <div class="flex justify-center lg:h-screen lg:items-center">
      <div class="w-full max-w-md p-5 animate-fade-in-zoom">
        <Logo className="mb-[80px] lg:mb-10" />
          <h2 class="text-2xl font-medium mb-9 leading-tight text-color-foreground">Log in</h2>
          <EmailPasswordSignin />
          <div class="flex items-center gap-3 mb-5">
            <Separator />
            <span class="text-sm text-color-muted-foreground">OR</span>
            <Separator />
          </div>
          <ContinueWithGoogle />
          <div class="flex justify-center mb-8 lg:mb-0">
            <TextLink href="/account" text="Create account" variant="muted" />
          </div>
      </div>
    </div>
{/if}