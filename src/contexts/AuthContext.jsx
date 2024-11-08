// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Only for initial load check

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            loadUser();
        } else {
            setLoading(false); // No token, so set loading to false immediately
        }
    }, []);

    const loadUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (err) {
            setIsAuthenticated(false);
            setUser(null);
            delete axios.defaults.headers.common['x-auth-token'];
        } finally {
            setLoading(false); // Only set loading to false after initial attempt
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setIsAuthenticated(true);
            await loadUser(); // Wait for loadUser to complete to populate user data
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
