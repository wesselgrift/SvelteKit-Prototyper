<script>
  import { resetPassword } from "$lib/firebase/auth";

  let email = $state("");
  let message = $state("");

  async function handleReset() {
    try {
      await resetPassword(email);
      message = "If there is an account linked to this email a password reset email has been sent!";
    } catch (err) {
      message = "Whoops, that doesn't work. Is this email correct?";
    }
  }

</script>


  {#if message}
    <p class=" text-sm bg-orange-50 text-orange-800 p-5 mb-3 rounded-md">{message}</p>
  {/if}
  <label for="resetPassword" class="block text-sm mb-1 font-medium">Email</label>
  <input name="resetPassword" class="shadow-sm block w-full text-md py-2 px-4 mb-2 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" type="email" bind:value={email} />
  <p class="h-9 text-xs mb-2 bloc text-gray-400 text-left">Fill in your email address and we'll send you a link to reset your password.</p>
  <button class="shadow-md hover:shadow-sm py-2 block text-md bg-primary-default hover:bg-primary-hover text-white w-full mb-5 rounded-lg transition focus:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:outline-none" onclick={handleReset}>Reset Password</button>



  