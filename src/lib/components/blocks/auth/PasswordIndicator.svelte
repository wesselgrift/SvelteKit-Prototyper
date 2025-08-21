<script>
	// Accept password from parent component to analyze its strength
	let { password = '' } = $props();
	
	// Track the calculated password strength (0-5 scale)
	let passwordStrength = $state(0);

	// Calculate password strength based on security criteria
	// Returns a number from 0-5 representing how many criteria are met
	function calculatePasswordStrength(password) {
		let strength = 0;
		
		// Check each security criterion and increment strength for each one met
		if (password.length >= 8) strength++;           // At least 8 characters
		if (/[A-Z]/.test(password)) strength++;         // Contains uppercase letter
		if (/[a-z]/.test(password)) strength++;         // Contains lowercase letter
		if (/[0-9]/.test(password)) strength++;         // Contains number
		if (/[^A-Za-z0-9]/.test(password)) strength++;  // Contains special character
		
		return strength;
	}

	// Reactively update password strength whenever the password changes
	// This runs automatically when the password prop changes
	$effect(() => {
		passwordStrength = calculatePasswordStrength(password);
	});
</script>

<!-- Main container for the password strength indicator -->
<div class="mb-6 w-full">
	<!-- Show visual strength indicator when user has entered a password -->
	{#if password}
		<div class="pt-1">
            
			<!-- Visual strength bar made of 5 segments -->
			<div class="mb-1 flex gap-2">
				<!-- Create 5 bar segments, each represents one security criterion -->
				{#each Array(5) as _, i}
					<div
						class="mb-1 h-1 flex-1 rounded transition-all duration-300"
						class:bg-red-500={passwordStrength === 1 && i < passwordStrength}
						class:bg-orange-500={passwordStrength === 2 && i < passwordStrength}
						class:bg-yellow-500={passwordStrength === 3 && i < passwordStrength}
						class:bg-green-500={passwordStrength >= 4 && i < passwordStrength}
						class:bg-green-400={passwordStrength >= 5 && i < passwordStrength}
						class:bg-gray-300={i >= passwordStrength}
					></div>
				{/each}
			</div>

			<!-- Text description of password strength with matching colors -->
			<p
				class="block text-left text-sm"
				class:text-red-500={passwordStrength === 1}
				class:text-orange-500={passwordStrength === 2}
				class:text-yellow-500={passwordStrength === 3}
				class:text-green-500={passwordStrength >= 4}
			>
				<!-- Display descriptive text based on strength level -->
				{#if passwordStrength === 1}Terrible password{/if}
				{#if passwordStrength === 2}Poor password{/if}
				{#if passwordStrength === 3}Fair password{/if}
				{#if passwordStrength === 4}Good password{/if}
				{#if passwordStrength === 5}Excellent password{/if}
			</p>
		</div>
	{/if}
	
	<!-- Show helpful instructions when no password has been entered yet -->
	{#if !password}
		<p class="bloc h-9 text-left text-sm text-muted-foreground">
			Use a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number
			and 1 special character.
		</p>
	{/if}
</div>
