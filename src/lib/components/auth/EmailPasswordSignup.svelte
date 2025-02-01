<script>
  import { register, login } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { db } from "$lib/firebase/firebase";
  import { setDoc, doc } from "firebase/firestore";
  import { fade } from "svelte/transition";
  import StrengthIndicator from '$lib/components/auth/passwordstrength/Indicator.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  
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
  <p class=" text-sm bg-color-success text-color-success-foreground p-5 mb-3 rounded-md" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>Account created</p>
{/if}

{#if error}
  <p class=" text-sm bg-color-destructive text-color-destructive-foreground p-5 mb-3 rounded-md" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>Whoops, that didn't work. Please check if you filled in all the fields correctly.</p>
{/if}

<form class="w-full" onsubmit={e => { e.preventDefault(); handleRegister(); }}>
  
  <div class="flex gap-4">
    <div class="w-full">
      <Label for="firstName" label="First name" />
      <Input name="firstName" type="text" bind:value={firstName} />
    </div>
    <div class="w-full">
      <Label for="lastName" label="Last name" />
      <Input name="lastName" type="text" bind:value={lastName} />
    </div>  
  </div>
  
  <Label for="email" label="Email" />
  <Input name="email" type="email" bind:value={email} />

  <Label for="password" label="Password" />
  <Input name="password" type="password" marginBottom="mb-2" bind:value={password} />

  <StrengthIndicator {password} {passwordStrength} />

  <Button type="submit">Get Started</Button>
</form>

