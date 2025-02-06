<script>
  import { loginWithGoogle } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { setDocument } from "$lib/firebase/firestore";
  import Button from '$lib/components/ui/Button.svelte';


  async function handleGoogleLogin() {
    try {

      // Login with Google
      const userCredential = await loginWithGoogle();

      // Get the userID, email and name
      const user = userCredential.user; 
      const userId = user.uid; 
      const email = user.email; 
      const displayName = user.displayName || "";
      const [firstName, lastName] = displayName.split(" ");

      // Set the user document in Firestore
      await setDocument("users", userId, {
        firstName: firstName, 
        lastName: lastName,  
        email: email
      });

      // Redirect to the app
      goto("/app");
      
    } catch (err) {

      console.error(err.message);

    }
  }
</script>

<div>
  <Button variant="secondary" onclick={handleGoogleLogin}>
    <img src="/google-icon.svg" alt="Google" class="w-5 h-5 mr-2" />
    Continue with Google
  </Button>
</div>