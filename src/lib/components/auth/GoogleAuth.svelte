<script>
  import { loginWithGoogle } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { db } from "$lib/firebase/firebase"; 
  import { setDoc, doc } from "firebase/firestore";


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

      goto("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  }
</script>

<div>
  <button class="flex items-center justify-center py-2 block text-md text-md block border border-slate-300 hover:border-slate-300 hover:bg-slate-50 text-black w-full rounded-lg transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:border-gray-400 focus:outline-none shadow-sm" on:click={handleGoogleLogin}>
    <img src="/google-icon.svg" alt="Google" class="w-5 h-5 mr-2" />
    Continue with Google
  </button>
</div>