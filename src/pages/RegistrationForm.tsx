import PocketBase from 'pocketbase';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/backgroundAnimation.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  display: inline-block;
`

const FormContainer = styled.div`
  border-radius: 10px;
  text-align: center;
`;

const FormTitle = styled.h1`
  color: #fff;
`;

const FormSubtitle = styled.p`
  font-size:20px;
  color: #fff;
`;

const FormField = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled(motion.button)`
  width: 100%;
  background-color: #f8b500;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
`;

type User = {
  username: string
  email: string
  password: string
}

interface RegistrationFormProps {
  onRegister: (user: UserType) => void;
}

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Por favor, completa todos los campos", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      const data: User = {
        "username": username,
        "email": email,
        "password": password,
      };

      const records = await pb.collection('users').getFullList();

      const existingEmailRecord = records.find(record => record.email === email);
      if (existingEmailRecord) {
        toast.error("El correo electrónico ya está registrado", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        return;
      }

      const existingUsernameRecord = records.find(record => record.username === username);
      if (existingUsernameRecord) {
        toast.error("El nombre de usuario ya está en uso", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        return;
      }

      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(email);

      toast.success("El usuario se ha creado satisfactoriamente", {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      localStorage.setItem("isLoggedIn", "true");
      onRegister({username, password})
      navigate("/");

    } catch (error: any) {
      toast.error(error.response.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Container>
      <Background>
        <svg preserveAspectRatio="xMidYMid slice" viewBox="0 30 100 55">
          <path
            fill="#9b5de5"
            className="out-top"
            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
          />
          <path
            fill="#f15bb5"
            className="in-top"
            d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
          />
          <path fill="#00bbf9" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
          <path fill="#00f5d4" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
        </svg>
      </Background>
      <FormContainer>
        <TextContainer>
          <FormTitle>La aventura empieza ahora! 🎥</FormTitle>
          <FormSubtitle>Crea tu cuenta y empieza a explorar!!</FormSubtitle>
        </TextContainer>

        <form onSubmit={handleSubmit}>
          <FormField>
            <FormInput type="text" value={username} placeholder='Usuario' onChange={handleUsernameChange} />
          </FormField>
          <FormField>
            <FormInput type="email" value={email} placeholder='E-mail' onChange={handleEmailChange} />
          </FormField>
          <FormField>
            <FormInput type="password" value={password} placeholder='Contraseña' onChange={handlePasswordChange} />
          </FormField>
          <ButtonsContainer>
            <Button type="submit" variants={buttonVariants} whileHover="hover">
              Registrarse
            </Button>
          </ButtonsContainer>
          <FormSubtitle>Ya tienes una cuenta? <Link to="/login" style={{ color: "#f8b500" }}>Inicia sesión</Link></FormSubtitle>
        </form>
        <ToastContainer />
      </FormContainer>
    </Container>
  );
};