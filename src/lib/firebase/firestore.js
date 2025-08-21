// Import our Firebase app configuration
import app from '$lib/firebase/firebase'

// Import Firestore functions for database operations
// These are the building blocks for all database interactions
import { 
    getFirestore,     // Initialize Firestore database instance
    doc,              // Reference a specific document
    collection,       // Reference a collection of documents
    getDoc,           // Read a single document
    getDocs,          // Read multiple documents
    setDoc,           // Create or overwrite a document
    updateDoc,        // Update specific fields in a document
    deleteDoc,        // Delete a document
    query,            // Create a database query
    where,            // Add filtering conditions to queries
    serverTimestamp   // Generate server-side timestamps
} from "firebase/firestore";

/**
 * Initialize Firestore database instance
 * 
 * This creates a connection to your Firebase Firestore database using the
 * client-side Firebase app. Unlike the Admin SDK, this respects security rules
 * and only allows operations that the current user is authorized to perform.
 */
const db = getFirestore(app);


/**
 * Create or update a document in Firestore
 * 
 * This function will:
 * - Create a new document if it doesn't exist
 * - Update an existing document if it does exist (merge mode)
 * - Automatically add createdAt and updatedAt timestamps
 * 
 * Example usage:
 * await setDocument('users', 'user123', { name: 'John', email: 'john@example.com' });
 * 
 * The { merge: true } option means existing fields not included in 'data' are preserved
 */
export async function setDocument(collectionName, docId, data) {
    try {
        // Create a reference to the specific document
        const docRef = doc(db, collectionName, docId);
        
        // Set the document with the provided data plus automatic timestamps
        await setDoc(docRef, {
            ...data,                        // Spread the user's data
            updatedAt: serverTimestamp(),   // Always update the timestamp
            createdAt: serverTimestamp()    // Set creation time (only on first create)
        }, { merge: true });                // Preserve existing fields not in this update
        
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error setting document:', error);
        throw error; // Re-throw so calling code can handle it
    }
}

/**
 * Retrieve a single document from Firestore by its ID
 * 
 * This function:
 * - Fetches one specific document using its ID
 * - Returns the document data combined with its ID
 * - Returns null if the document doesn't exist
 * 
 * Example usage:
 * const user = await getDocument('users', 'user123');
 * if (user) { console.log(user.name); } else { console.log('User not found'); }
 */
export async function getDocument(collectionName, docId) {
    try {
        // Create a reference to the specific document
        const docRef = doc(db, collectionName, docId);
        
        // Attempt to fetch the document
        const docSnap = await getDoc(docRef);
        
        // Check if the document actually exists
        if (docSnap.exists()) {
            // Return document data combined with its ID for convenience
            return { id: docSnap.id, ...docSnap.data() };
        }
        
        // Document doesn't exist
        return null;
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

/**
 * Retrieve all documents from a collection
 * 
 * This function:
 * - Fetches every document in the specified collection
 * - Returns an array of documents, each with its ID included
 * - Returns an empty array if the collection is empty
 * 
 * Example usage:
 * const allUsers = await getCollection('users');
 * console.log(`Found ${allUsers.length} users`);
 * 
 * Warning: Be careful with large collections as this fetches ALL documents
 */
export async function getCollection(collectionName) {
    try {
        // Get all documents from the collection
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        // Transform each document into a plain object with ID included
        return querySnapshot.docs.map(doc => ({
            id: doc.id,        // Include the document ID
            ...doc.data()      // Spread all the document fields
        }));
    } catch (error) {
        console.error('Error getting collection:', error);
        throw error;
    }
}

/**
 * Update an existing document in Firestore
 * 
 * This function:
 * - Updates only the fields you specify in 'data'
 * - Preserves all other existing fields in the document
 * - Automatically updates the 'updatedAt' timestamp
 * - Will fail if the document doesn't exist (unlike setDocument)
 * 
 * Example usage:
 * await updateDocument('users', 'user123', { name: 'Jane Doe' });
 * // Only updates the name field, leaves email, etc. unchanged
 */
export async function updateDocument(collectionName, docId, data) {
    try {
        // Create a reference to the specific document
        const docRef = doc(db, collectionName, docId);
        
        // Update only the specified fields plus timestamp
        await updateDoc(docRef, {
            ...data,                      // The fields to update
            updatedAt: serverTimestamp()  // Always track when it was last modified
        });
        
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

/**
 * Delete a document from Firestore
 * 
 * This function:
 * - Permanently removes the document from the database
 * - Succeeds even if the document doesn't exist (no error thrown)
 * - Cannot be undone - the document is gone forever
 * 
 * Example usage:
 * await deleteDocument('users', 'user123');
 * console.log('User deleted successfully');
 * 
 * Warning: This is permanent! Consider adding a 'deleted' flag instead for soft deletes
 */
export async function deleteDocument(collectionName, docId) {
    try {
        // Create a reference to the specific document
        const docRef = doc(db, collectionName, docId);
        
        // Delete the document permanently
        await deleteDoc(docRef);
        
        return { success: true, id: docId };
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

/**
 * Query documents in a collection based on a field value
 * 
 * This function:
 * - Searches for documents where a specific field equals a specific value
 * - Returns an array of matching documents with their IDs
 * - Returns an empty array if no documents match
 * - More efficient than fetching all documents and filtering client-side
 * 
 * Example usage:
 * const activeUsers = await queryDocuments('users', 'status', 'active');
 * const usersByEmail = await queryDocuments('users', 'email', 'john@example.com');
 * 
 * Note: This only supports simple equality queries. For more complex queries,
 * you'll need to use the Firestore SDK directly
 */
export async function queryDocuments(collectionName, field, value) {
    try {
        // Build a query with a where clause
        const q = query(
            collection(db, collectionName),   // The collection to search
            where(field, '==', value)         // The condition: field equals value
        );
        
        // Execute the query
        const querySnapshot = await getDocs(q);
        
        // Transform results into plain objects with IDs
        return querySnapshot.docs.map(doc => ({
            id: doc.id,        // Include the document ID
            ...doc.data()      // Spread all the document fields
        }));
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
}

// Export the database instance for direct use if needed
// Most of the time you should use the helper functions above instead
export default db;

