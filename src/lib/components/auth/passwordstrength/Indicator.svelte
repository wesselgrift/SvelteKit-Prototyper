<script>
  let { password = "" } = $props();
  let passwordStrength = $state(0);
  
  
    function calculatePasswordStrength(password) {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    }

  $effect(() => {
    passwordStrength = calculatePasswordStrength(password);
  });
</script>
  
  <div class="mb-6">
    {#if password}
      <div class="mb-8">
        <!-- Password strength bar -->
        <div class="flex gap-2 mb-1">
          {#each Array(5) as _, i}
            <div class="h-1 flex-1 rounded mb-1 transition-all duration-300"
                class:bg-red-500={passwordStrength === 1 && i < passwordStrength}
                class:bg-orange-500={passwordStrength === 2 && i < passwordStrength}
                class:bg-yellow-500={passwordStrength === 3 && i < passwordStrength}
                class:bg-green-500={passwordStrength >= 4 && i < passwordStrength}
                class:bg-green-400={passwordStrength >= 5 && i < passwordStrength}
                class:bg-gray-300={i >= passwordStrength}>
            </div>
          {/each}
        </div>
  
        <!-- Password strength text -->
        <p class="text-sm block text-left"
          class:text-red-500={passwordStrength === 1}
          class:text-orange-500={passwordStrength === 2}
          class:text-yellow-500={passwordStrength === 3}
          class:text-green-500={passwordStrength >= 4}> 
          {#if passwordStrength === 1}Terrible password{/if}
          {#if passwordStrength === 2}Poor password{/if}
          {#if passwordStrength === 3}Fair password{/if}
          {#if passwordStrength === 4}Good password{/if}
          {#if passwordStrength === 5}Excellent password{/if}
        </p>
      </div>
    {/if}
    {#if !password}
      <p class="h-9 text-sm mb-8 bloc text-color-muted-foreground text-left">Use a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.</p>
    {/if}
  </div>