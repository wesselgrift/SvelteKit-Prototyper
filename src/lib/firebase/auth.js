import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export async function loginWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function logout() {
  return await signOut(auth);
}

export default auth;
