<script>
  import { resetPassword } from "$lib/firebase/auth";
  import Label from '$lib/components/ui/Label.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  let email = $state("");
  let message = $state("");
  let messageError = $state("");
  let showLoading = $state(false);

  async function handleReset() {
    try {
      showLoading = true;
      await resetPassword(email);
      message = "If there is an account linked to this email a password reset email has been sent!";
    } catch (err) {
      showLoading = false;
      messageError = "Whoops, that doesn't work. Is this email correct?";
    } finally {
      showLoading = false;
    }
  }

</script>


  {#if message}
    <p class=" text-sm bg-color-success text-color-success-foreground p-5 mb-3 rounded-md">{message}</p>
  {:else if messageError}
    <p class=" text-sm bg-color-destructive text-color-destructive-foreground p-5 mb-3 rounded-md">{messageError}</p>
  {/if}

  <Label for="resetPassword" label="Email" />
  <Input name="resetPassword" type="email" bind:value={email} marginBottom="mb-2" />
  <p class="text-sm mb-8 bloc text-color-muted-foreground text-left">Fill in your email address and we'll send you a link to reset your password.</p>

  <Button onclick={handleReset}>
    {#if showLoading}
      <Spinner className="w-6 h-6 mr-3" spinColor="fill-color-primary-foreground" pathColor="text-color-primary-hover" />
    {/if}
    Reset Password
  </Button>



  