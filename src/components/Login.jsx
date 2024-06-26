import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ErrorModal from './ErrorModal';
import Header from './Header';
import Footer from './Footer';
import { handleAuthError } from '../utils/errorHandlers';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoading(false);
            handleAuthError(error, setError, setModalIsOpen);
            console.error("Failed to log in", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <h2>Enter your details to Login</h2>
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
                            <p>
                                <Link to="/password-reset">Forgot Password?</Link>
                            </p>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
                <p>
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </div>
            <ErrorModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                errorMessage={error}
            />
            <Footer />
        </div>
    );
}

export default Login;
