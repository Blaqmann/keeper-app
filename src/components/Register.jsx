import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
import Header from './Header';
import Footer from './Footer';
import { handleAuthError } from '../utils/errorHandlers';

Modal.setAppElement('#root');

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: email,
            });

            navigate('/');
        } catch (error) {
            handleAuthError(error, setError, setModalIsOpen);
            console.error("Failed to register", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <h2>Enter your details to Register</h2>
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" required={true} placeholder="Please enter a valid address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" required={true} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                )}
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Error"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => setModalIsOpen(false)}>OK</button>
            </Modal>
            <Footer />
        </div>
    );
}

export default Register;
