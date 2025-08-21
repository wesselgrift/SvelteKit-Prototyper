// Import Firebase Admin SDK functions - these are for SERVER-SIDE use only
// Admin SDK has elevated privileges and can bypass security rules
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Import private environment variables that contain Firebase service account credentials
// These are NEVER exposed to the client and are only available on the server
import { 
    FIREBASE_PROJECT_ID, 
    FIREBASE_CLIENT_EMAIL, 
    FIREBASE_PRIVATE_KEY 
} from '$env/static/private';

// Check if any Firebase Admin apps are already initialized
// This prevents duplicate initialization errors during development (hot reloads)
const apps = getApps();

/**
 * Initialize Firebase Admin app with service account credentials
 * 
 * This creates a Firebase Admin connection that can:
 * - Verify authentication tokens from the client
 * - Read/write to Firestore with admin privileges
 * - Manage user accounts (create, delete, update)
 * - Bypass all Firestore security rules
 * 
 * The service account credentials give this app "god mode" access to your Firebase project
 * That's why these credentials must NEVER be exposed to the client-side code
 */
const app = apps.length === 0 ? initializeApp({
    // Create certificate from service account credentials
    credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines in the private key (common issue with env vars)
        privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    projectId: FIREBASE_PROJECT_ID
}) : apps[0]; // Use existing app if already initialized

/**
 * Admin Auth instance - for server-side authentication operations
 * 
 * This allows us to:
 * - Verify ID tokens sent from the client
 * - Get user information by UID
 * - Create/delete user accounts
 * - Set custom claims on user accounts
 * 
 * Used in hooks.server.js to verify user authentication
 */
export const adminAuth = getAuth(app);

/**
 * Admin Firestore instance - for server-side database operations
 * 
 * This allows us to:
 * - Read/write any document in the database (bypasses security rules)
 * - Perform complex queries and transactions
 * - Manage user profiles and application data
 * 
 * Used in +layout.server.js and other server-side files to manage user data
 */
export const adminDb = getFirestore(app);