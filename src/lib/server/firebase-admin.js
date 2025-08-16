import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { 
    FIREBASE_PROJECT_ID, 
    FIREBASE_CLIENT_EMAIL, 
    FIREBASE_PRIVATE_KEY 
} from '$env/static/private';

const apps = getApps();

const app = apps.length === 0 ? initializeApp({
    credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    projectId: FIREBASE_PROJECT_ID
}) : apps[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);