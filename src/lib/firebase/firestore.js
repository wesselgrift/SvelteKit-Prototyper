import app from '$lib/firebase/firebase'
import { 
    getFirestore, 
    doc, 
    collection,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp 
} from "firebase/firestore";

const db = getFirestore(app);


// Creates or overwrites a document in Firestore with the specified data
// Returns an object with success status and document ID
export async function setDocument(collectionName, docId, data) {
    try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error setting document:', error);
        throw error;
    }
}

// Retrieves a single document from Firestore by its ID
// Returns the document data with ID or null if not found
export async function getDocument(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

// Retrieves all documents from a collection
// Returns an array of documents with their IDs
export async function getCollection(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting collection:', error);
        throw error;
    }
}

// Updates an existing document in Firestore, preserving fields not included in the update
// Returns an object with success status and document ID
export async function updateDocument(collectionName, docId, data) {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

// Deletes a document from Firestore
// Returns an object with success status and document ID
export async function deleteDocument(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

// Queries documents in a collection where a field matches a specific value
// Returns an array of matching documents with their IDs
export async function queryDocuments(collectionName, field, value) {
    try {
        const q = query(collection(db, collectionName), where(field, '==', value));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
}

export default db;

