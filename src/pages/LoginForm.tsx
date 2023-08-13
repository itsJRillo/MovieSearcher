import React, { useState } from 'react';
import PocketBase from 'pocketbase';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../styles/backgroundAnimation.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100%;
  min-height: 100vh; /* Use min-height to prevent content overflow */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 2rem;
`;

const FormContainer = styled.div`
  border-radius: 10px;
  text-align: center;
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const TextContainer = styled.div`
  display: inline-block;
  text-align: center;
  `;

const FormTitle = styled.h1`
  color: #fff;
  `;

const FormSubtitle = styled.p`
  font-size: 18px;
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

interface LoginFormProps {
  onLogin: (user: UserType) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {

  const pb = new PocketBase('http://127.0.0.1:8090');
  const navigate = useNavigate();

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

    if (!username || !password) {
      toast.error("Por favor, completa todos los campos", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      const data = {
        username,
        password,
      };

      const records = await pb.collection('users').getFullList({
        sort: '-created',
      });

      let userFound = false;

      for (const record of records) {
        if (record.username === data.username) {
          userFound = true;
          if (record.password === data.password) {
            toast.success("Se ha iniciado sesión correctamente", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            
            onLogin({ username, password });
            navigate("/home");
            break;

          } else {
            toast.error("Contraseña incorrecta", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
        }
      }

      if (!userFound) {
        toast.error("Usuario no encontrado", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }

    } catch (error: any) {
      toast.error(error.response ? error.response.message : "Error desconocido", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  const variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Container>
      <FormContainer>
        <TextContainer>
          <FormTitle>Bienvenido a Shoten! 👋</FormTitle>
          <FormSubtitle>
            Por favor, inicia sesión en tu cuenta y comienza la aventura.
          </FormSubtitle>
        </TextContainer>

        <form onSubmit={handleSubmit}>
          <FormField>
            <FormInput
              type="text"
              value={username}
              placeholder="Usuario"
              onChange={handleUsernameChange}
            />
          </FormField>
          <FormField>
            <FormInput
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={handlePasswordChange}
            />
          </FormField>
          <ButtonsContainer>
            <Button type="submit" variants={variants} whileHover="hover">
              Inicia sesión
            </Button>
          </ButtonsContainer>
          <FormSubtitle>
            Eres nuevo en la plataforma?{' '}
            <Link to="/sign-up" style={{ color: '#f8b500' }}>
              <motion.p variants={variants} whileHover="hover" style={{padding:8, margin:0}}>Crea una cuenta</motion.p>
            </Link>
          </FormSubtitle>
        </form>
        <ToastContainer />
      </FormContainer>
    </Container>
  );
};