import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AddNote from './AddNote';
import NotesList from './NotesList';
import { auth, fetchNotes } from '../firebase';
import Header from './Header';
import Footer from './Footer';
import Welcome from './Welcome';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { currentUser } = useAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserNotes = async () => {
            if (currentUser) {
                const userNotes = await fetchNotes(currentUser.uid);
                setNotes(userNotes);
            }
            setLoading(false);
        };

        fetchUserNotes();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('Logout successful');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const addNoteToList = (note) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!currentUser) {
        return <Welcome />;
    }

    return (
        <div>
            <Header />
            <div className="navbar">
                <h3 className="welcome-message">Welcome, {currentUser.username}!</h3>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            <div className="home-container">
                <AddNote userId={currentUser.uid} addNoteToList={addNoteToList} />
                <NotesList notes={notes} setNotes={setNotes} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
