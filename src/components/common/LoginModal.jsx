// src/components/LoginModal.js
import React, { useState, useContext, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../contexts/AuthContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007bff',
        },
        background: {
            paper: '#1b1b1b',
            default: '#0d0d0d',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#9e9e9e',
        },
    },
});

const LoginModal = ({ open, onClose, onRegisterOpen }) => {
    const { login, isAuthenticated, error, setError } = useContext(AuthContext); // Add isAuthenticated
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Close modal on successful login
    useEffect(() => {
        if (isAuthenticated && open) {
            onClose();
        }
    }, [isAuthenticated, open, onClose]);

    // Clear error when the modal opens or closes
    useEffect(() => {
        if (!open) {
            setError(null);
        }
    }, [open, setError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error before attempting login
        login(email, password);
    };

    const handleRegistrationClick = () => {
        onClose();
        onRegisterOpen();
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Login
                    </Typography>

                    {/* Display the error message if it exists */}
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#9e9e9e' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#007bff' },
                                    '&:hover fieldset': { borderColor: '#007bff' },
                                },
                                input: { color: '#e0e0e0' },
                            }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#9e9e9e' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#007bff' },
                                    '&:hover fieldset': { borderColor: '#007bff' },
                                },
                                input: { color: '#e0e0e0' },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }}>
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '16px', color: '#9e9e9e' }}>
                        Don’t have an account?{' '}
                        <Link href="#" onClick={handleRegistrationClick} sx={{ color: '#007bff', cursor: 'pointer' }}>
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default LoginModal;
