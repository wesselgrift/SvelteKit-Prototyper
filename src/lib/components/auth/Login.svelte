<script>
  import { login } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import Label from '$lib/components/ui/Label.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Button from '$lib/components/ui/Button.svelte';
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
  <Label for="email" label="Email" />
  <Input name="email" type="email" bind:value={email} />

  <Label for="password" label="Password" />
  <Input name="password" type="password" bind:value={password} />

  <div class="mb-8">
    <TextLink href="/reset-password" text="Forgot Password?" />
  </div>
  
  <Button type="submit">Submit</Button>
</form>