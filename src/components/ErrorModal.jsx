import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ErrorModal({ isOpen, onRequestClose, errorMessage }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Error"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

export default ErrorModal;
