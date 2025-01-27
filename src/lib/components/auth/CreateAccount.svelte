<script>
  import { register, login } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { db } from "$lib/firebase/firebase";
  import { setDoc, doc } from "firebase/firestore";
  import { fade } from "svelte/transition";
  import PasswordStrengthIndicator from './password/PasswordStrengthIndicator.svelte';

  
  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let result = $state("");
  let error = $state("");
  let passwordStrength = $state(0);

  async function handleRegister() {
    try {
      const userCredential = await register(email, password);
      const userId = userCredential.user.uid;

      error = "";
      result = true;

      localStorage.setItem("email", email);

      await setDoc(doc(db, "users", userId), {
        firstName,
        lastName,
        email
      });

      await login(email, password);
      goto("/app");
    } catch (err) {
      result = "";
      error = true;
    }
  }

  
</script>


{#if result}
  <p class=" text-sm bg-green-50 text-green-800 p-5 mb-3 rounded-md" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>Account created</p>
{/if}

{#if error}
  <p class=" text-sm bg-red-50 text-red-800 p-5 mb-3 rounded-md" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>Whoops, that didn't work. Please check if you filled in all the fields correctly.</p>
{/if}

<form onsubmit={e => { e.preventDefault(); handleRegister(); }}>
  <div class="flex gap-4">
    <div class="w-full">
      <label for="firstName" class="block text-sm mb-1 font-medium">First name</label>
      <input name="firstName" type="text" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" bind:value={firstName} />
    </div>
    <div class="w-full">
      <label for="lastName" class="block text-sm mb-1 font-medium">Last name</label>
      <input name="lastName" type="text" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" bind:value={lastName} />
    </div>  
  </div>
  <label for="email" class="block text-sm mb-1 font-medium">Email</label>
  <input name="email" type="email" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" bind:value={email} />
  <label for="password" class="block text-sm mb-1 font-medium">Password</label>
  <input name="password" type="password" class="shadow-sm block w-full text-md py-2 px-4 mb-3 border border-1 border-gray-300 rounded-md transition focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:border-gray-400" bind:value={password} />
  <PasswordStrengthIndicator {password} {passwordStrength} />

  <button class="shadow-md hover:shadow-sm py-2 block text-md bg-primary-default hover:bg-primary-hover text-white w-full mb-5 rounded-lg transition focus:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:outline-none" type="submit">Get started</button>
</form>

