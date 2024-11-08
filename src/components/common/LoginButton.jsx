// src/components/LoginButton.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

const LoginButton = () => {
    const { isAuthenticated, logout, loading } = useContext(AuthContext);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const handleLoginOpen = () => {
        setIsLoginOpen(true);
        setIsRegistrationOpen(false);
    };

    const handleRegistrationOpen = () => {
        setIsRegistrationOpen(true);
        setIsLoginOpen(false);
    };

    const handleClose = () => {
        setIsLoginOpen(false);
        setIsRegistrationOpen(false);
    };

    if (loading) return <button className="login-button" disabled>Loading...</button>; // Optional loading state

    return (
        <>
            {isAuthenticated ? (
                <button className="login-button" onClick={logout}>
                    Logout
                </button>
            ) : (
                <button className="login-button" onClick={handleLoginOpen}>
                    Login
                </button>
            )}

            <LoginModal
                open={isLoginOpen}
                onClose={handleClose}
                onRegisterOpen={handleRegistrationOpen}
            />
            <RegistrationModal
                open={isRegistrationOpen}
                onClose={handleClose}
                onLoginOpen={handleLoginOpen}
            />
        </>
    );
};

export default LoginButton;
