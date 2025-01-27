import { writable } from "svelte/store";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import app from "../firebase/firebase";
import { goto } from "$app/navigation";

const auth = getAuth(app);
export const user = writable(null);
export const loading = writable(true);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user.set(currentUser);

      if (currentUser) {
        console.log("Auth state changed: user is signed in");
      } else {
        console.log("Auth state changed: no user is signed in");
        if (typeof window !== 'undefined') {
          goto("/login");
        }
      }
      loading.set(false);
    });
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
