import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Welcome() {
    return (
        <div>
            <Header />
            <div className="home-container">
                <h1>Welcome to Keeper!</h1>
                <p>This app allows you to create, view, and manage your personal notes securely.</p>
                <p>Please log in or register to continue.</p>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
            </div>
            <Footer />
        </div>
    );
}

export default Welcome;
