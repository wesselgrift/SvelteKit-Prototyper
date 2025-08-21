// Import the Firebase app initialization function
// This is the main entry point for connecting to Firebase services
import { initializeApp } from "firebase/app";

/**
 * Firebase configuration object
 * 
 * This contains all the connection details needed to connect to your specific Firebase project.
 * These values come from your Firebase Console project settings.
 * 
 * Important notes:
 * - These are PUBLIC values (they're safe to expose in client-side code)
 * - They identify which Firebase project to connect to
 * - The VITE_ prefix makes them available in the browser via import.meta.env
 * - These should be set in your .env file (see env.example)
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

/**
 * Initialize the Firebase app with our configuration
 * 
 * This creates the main Firebase app instance that all other Firebase services
 * (Auth, Firestore, Storage, etc.) will use to connect to your project.
 * 
 * This is the CLIENT-SIDE Firebase app (different from the Admin SDK used on the server)
 * It respects Firestore security rules and has limited permissions.
 */
const app = initializeApp(firebaseConfig);

// Export the app instance so other files can use it to access Firebase services
// For example: getAuth(app), getFirestore(app), etc.
export default app;