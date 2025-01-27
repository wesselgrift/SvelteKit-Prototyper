<script>
  import CreateAccount from "$lib/components/auth/CreateAccount.svelte";
  import GoogleAuth from "$lib/components/auth/GoogleAuth.svelte";
</script>


<div class="flex flex-col justify-center items-center" style="padding-top: 120px;">
  <div style="max-width: 470px;" class="p-5 w-full">
    <img src="/logo.svg" alt="Google" class="h-8 mb-10" />
    <h2 class="text-3xl font-semibold mb-9 leading-tight">Create Account</h2>
    <CreateAccount />      
    <div class="flex items-center gap-2 mb-5">
      <hr class="w-full">
      <span class="text-xs text-gray-400">OR</span>
      <hr class="w-full">
    </div>
    <GoogleAuth />
    <p class="w-full text-center text-sm mt-5">Already signed up? <a class="text-blue-600 hover:text-blue-800 text-sm" href="/login">Log in</a></p>
  </div>
</div>