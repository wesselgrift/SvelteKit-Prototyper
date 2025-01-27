<script>
  import { login } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";

  let email = $state("");
  let password = $state("");
  let error = $state("");

  $effect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      email = savedEmail;
    }
  });

  async function handleLogin() {
    try {
      await login(email, password);
      localStorage.setItem("email", email);
      goto("/app");
    } catch (err) {
      error = err.message;
    }
  }
</script>

{#if error}
  <p class="text-sm bg-red-50 text-red-800 p-5 mb-3 rounded-md" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>
    Whoops, that didn't work. Please check if you filled in both email and password correctly.
  </p>
{/if}

<form onsubmit={e => { e.preventDefault(); handleLogin(); }}>
  <label for="email" class="block text-sm mb-1 font-medium">Email</label>
  <input name="email" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" type="email" bind:value={email} />
  <label for="password" class="block text-sm mb-1 font-medium">Password</label>
  <input name="password" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" type="password" bind:value={password} />
  
  <div class="flex justify-between align-middle mb-8">
    <a class="text-primary-default hover:text-primary-hover hover:underline text-sm transition" href="/reset-password">Forgot Password?</a>
  </div>
  
  <button class="shadow-md hover:shadow-sm py-2 block text-md bg-primary-default hover:bg-primary-hover text-white w-full mb-5 rounded-lg transition focus:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:outline-none" type="submit">Sign in</button>
</form>