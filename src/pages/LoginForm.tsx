// LoginForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const FormContainer = styled(motion.div)`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f2f2f2;
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #555;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #edcc58;
  width: 45%;
  height: 45%;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  padding: 0.75rem;
  cursor: pointer;
`;

const GoogleButton = styled(Button)`
    background-color: #db4437;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/logi n', { username, password });
            console.log('Login success:', response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    const motionProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
    };

    return (
        <FormContainer {...motionProps}>
            <FormTitle>Login</FormTitle>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <FormLabel>Username</FormLabel>
                    <FormInput type="text" value={username} onChange={handleUsernameChange} />
                </FormField>
                <FormField>
                    <FormLabel>Password</FormLabel>
                    <FormInput type="password" value={password} onChange={handlePasswordChange} />
                </FormField>
                <ButtonsContainer>
                    <Button type="submit">Login</Button>
                    <GoogleButton onClick={handleGoogleLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512" style={{ fill: "#ffffff" }}><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                        Login with Google
                    </GoogleButton>
                </ButtonsContainer>
            </form>
        </FormContainer>
    );
};

export default LoginForm;
