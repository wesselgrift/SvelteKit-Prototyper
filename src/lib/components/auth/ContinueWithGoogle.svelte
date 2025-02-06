<script>
  import { loginWithGoogle } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import db from "$lib/firebase/firestore";
  import { setDoc, doc } from "firebase/firestore";
  import Button from '$lib/components/ui/Button.svelte';


  async function handleGoogleLogin() {
    try {
      const userCredential = await loginWithGoogle();
      const user = userCredential.user; 
      const userId = user.uid; 
      const email = user.email; 
      const displayName = user.displayName || "";
      const [firstName, lastName] = displayName.split(" ");

      await setDoc(doc(db, "users", userId), {
        firstName: firstName, 
        lastName: lastName,  
        email: email
      }, { merge: true }); 

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