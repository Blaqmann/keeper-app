import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Note({ note, onDelete, onEdit }) {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            onDelete(note.id);
        }
    };

    return (
        <div className="note-card">
            <p><strong>{note.title}</strong></p>
            <p>{note.content}</p>
            <div className="note-actions">
                <button onClick={handleDelete} className="delete-button">
                    <FaTrash />
                </button>
                <button onClick={() => onEdit(note)} className="edit-button">
                    <FaEdit />
                </button>
            </div>
        </div>
    );
}

export default Note;
