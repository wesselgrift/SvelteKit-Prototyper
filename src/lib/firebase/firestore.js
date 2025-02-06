import app from '$lib/firebase/firebase'
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default db;