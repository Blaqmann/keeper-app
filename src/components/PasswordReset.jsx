import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Modal from 'react-modal';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Check your inbox!');
            setModalIsOpen(true);
        } catch (error) {
            console.error("Error sending password reset email: ", error);
            setMessage('Error sending password reset email. Please check the address and try again later.');
            setModalIsOpen(true);
        }
    };

    const closeModalAndRedirect = () => {
        setModalIsOpen(false);
        navigate('/login');
    };

    return (
        <div>
            <Header />
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModalAndRedirect}
                contentLabel="Message"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Password Reset</h2>
                <p>{message}</p>
                <button onClick={closeModalAndRedirect}>Close</button>
            </Modal>
            <Footer />
        </div>
    );
}

export default PasswordReset;