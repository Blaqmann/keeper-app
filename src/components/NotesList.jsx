import React, { useEffect, useState } from 'react';
import Note from './Note';
import { fetchNotes, deleteNote, updateNote } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function NotesList({ notes, setNotes }) {
    const { currentUser } = useAuth();
    const [editingNote, setEditingNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const getNotes = async () => {
            if (currentUser) {
                const notesData = await fetchNotes(currentUser.uid);
                setNotes(notesData);
            }
        };

        getNotes();
    }, [currentUser, setNotes]);

    const handleDelete = async (noteId) => {
        await deleteNote(noteId);
        setNotes(notes.filter(note => note.id !== noteId));
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const updatedNote = {
            ...editingNote,
            title,
            content,
            timestamp: editingNote.timestamp
        };

        await updateNote(editingNote.id, updatedNote);
        setNotes(notes.map(note => (note.id === editingNote.id ? updatedNote : note)));
        setEditingNote(null);
        setTitle('');
        setContent('');
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div>
            <div className="notes-container">
                {notes.map(note => (
                    <Note key={note.id} note={note} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>

            {editingNote && (
                <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleEditSubmit}>
                            <h3>Edit Note</h3>
                            <div>
                                <label>Title:</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label>Content:</label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                            </div>
                            <div className="modal-actions">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingNote(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotesList;
