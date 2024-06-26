import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: YOUR_FIREBASE_API_KEY,
    authDomain: YOUR_FIREBASE_AUTH_DOMAIN,
    projectId: YOUR_FIREBASE_PROJECT_ID,
    storageBucket: YOUR_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: YOUR_FIREBASE_MESSAGING_SENDER_ID,
    appId: YOUR_FIREBASE_APP_ID,
    measurementId: YOUR_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const fetchNotes = async (userId) => {
    try {
        const q = query(collection(db, "notes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const notes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return notes;
    } catch (error) {
        console.error("Error fetching notes: ", error);
        return [];
    }
};


const addNote = async (userId, title, noteContent) => {
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            userId,
            title,
            content: noteContent,
            timestamp: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding note: ", error);
        return null;
    }
};

const updateNote = async (noteId, updatedNote) => {
    const noteRef = doc(db, 'notes', noteId);
    await setDoc(noteRef, updatedNote, { merge: true });
};


const deleteNote = async (noteId) => {
    try {
        await deleteDoc(doc(db, "notes", noteId));
        console.log("Note deleted with ID: ", noteId);
    } catch (error) {
        console.error("Error deleting note: ", error);
    }
};


export { db, auth, collection, addDoc, getDocs, query, where, fetchNotes, addNote, updateNote, deleteNote };