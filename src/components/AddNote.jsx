import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddNote({ addNoteToList }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'notes'), {
                userId: currentUser.uid,
                title: title,
                content: content,
                timestamp: new Date()
            });
            setTitle('');
            setContent('');

            const newNote = {
                id: docRef.id,
                userId: currentUser.uid,
                title: title,
                content: content,
                timestamp: new Date()
            };
            addNoteToList(newNote);
        } catch (error) {
            console.error("Error adding note: ", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} required={true} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} required={true} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}

export default AddNote;