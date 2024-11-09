// src/components/RegistrationModal.js
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

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

const RegistrationModal = ({ open, onClose, onLoginOpen }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match!");
            return;
        }

        try {
            // Convert email to lowercase
            const res = await axios.post('http://localhost:5000/api/users/register', {
                name: username,
                email: email.toLowerCase(), // Convert to lowercase
                password,
            });

            setRegistrationSuccess(true);
            console.log('User registered successfully:', res.data);

        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            // Display specific error message
            setErrorMessage(error.response?.data.errors[0].msg || 'Registration failed');
        }
    };

    const handleLoginClick = () => {
        onClose();
        onLoginOpen();
        setRegistrationSuccess(false);
        resetForm();
    };

    const handleModalClose = () => {
        onClose();
        setRegistrationSuccess(false);
        resetForm();
    };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage(''); // Reset error message on close
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal open={open} onClose={handleModalClose}>
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
                    {registrationSuccess ? (
                        <>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                                sx={{ textAlign: 'center', fontWeight: 'bold' }}
                            >
                                Registration Successful!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ textAlign: 'center', marginTop: '16px', color: '#e0e0e0' }}
                            >
                                Your account has been created successfully.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: 'center', marginTop: '16px', color: '#9e9e9e' }}
                            >
                                You can now{' '}
                                <Link
                                    href="#"
                                    onClick={handleLoginClick}
                                    sx={{ color: '#007bff', cursor: 'pointer' }}
                                >
                                    login here
                                </Link>
                                .
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                                sx={{ textAlign: 'center', fontWeight: 'bold' }}
                            >
                                Register
                            </Typography>
                            {errorMessage && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    sx={{ textAlign: 'center', marginBottom: '16px' }}
                                >
                                    {errorMessage}
                                </Typography>
                            )}
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    InputLabelProps={{
                                        style: { color: '#9e9e9e' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#007bff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#007bff',
                                            },
                                        },
                                        input: {
                                            color: '#e0e0e0',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    InputLabelProps={{
                                        style: { color: '#9e9e9e' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#007bff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#007bff',
                                            },
                                        },
                                        input: {
                                            color: '#e0e0e0',
                                        },
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
                                    InputLabelProps={{
                                        style: { color: '#9e9e9e' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#007bff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#007bff',
                                            },
                                        },
                                        input: {
                                            color: '#e0e0e0',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    InputLabelProps={{
                                        style: { color: '#9e9e9e' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#007bff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#007bff',
                                            },
                                        },
                                        input: {
                                            color: '#e0e0e0',
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: '16px' }}
                                >
                                    Register
                                </Button>
                            </form>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: 'center', marginTop: '16px', color: '#9e9e9e' }}
                            >
                                Already have an account?{' '}
                                <Link
                                    href="#"
                                    onClick={handleLoginClick}
                                    sx={{ color: '#007bff', cursor: 'pointer' }}
                                >
                                    Login here
                                </Link>
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default RegistrationModal;
