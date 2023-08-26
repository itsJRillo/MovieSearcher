import PocketBase from 'pocketbase';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import "../styles/backgroundAnimation.css"
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from "react-i18next";


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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
  @media (max-width: 600px) {
    padding: 4rem;
  }
`;

const TextContainer = styled.div`
  display: inline-block;
`

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
  gap: 0.5rem;
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

interface RegistrationFormProps {
  onRegister: (user: UserType) => void;
}

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const pb = new PocketBase('https://shoten-api.pockethost.io');
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
  };

  // const handleGithubLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {

  //     await pb.collection('users').authWithOAuth2({ provider: 'github' });

  //     toast.success("El usuario se ha creado satisfactoriamente", {
  //       position: toast.POSITION.BOTTOM_RIGHT
  //     });

  //     onRegister({ username, email, password })
  //     navigate("/home");

  //   } catch (error: any) {
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error(t("warningAllInputs"), {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      const records = await pb.collection('users').getFullList();

      const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": rePassword,
        "favorites": []
      };

      const existingEmailRecord = records.find(record => record.email === email);
      if (existingEmailRecord) {
        toast.error(t("warningExistentEmail"), {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        return;
      }

      const existingUsernameRecord = records.find(record => record.username === username);
      if (existingUsernameRecord) {
        toast.error(t("warningExistentUsername"), {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        return;
      }

      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(email);

      toast.success(t("successSignup"), {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      onRegister({ username, email, password })
      navigate("/home");

    } catch (error: any) {
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
    <Container data-cy="signupContainer">
      <FormContainer>
        <TextContainer>
          <FormTitle>{t("welcomeMessageSignup")}</FormTitle>
          <FormSubtitle>{t("welcomeSubmessageSignup")}</FormSubtitle>
        </TextContainer>

        <form onSubmit={handleSubmit}>
          <FormField>
            <FormInput
              type="text"
              value={username}
              placeholder={`${t("placeholderUserInput")}`}
              onChange={handleUsernameChange}
              data-cy="signupUserInput"
            />
          </FormField>
          <FormField>
            <FormInput
              type="email"
              value={email}
              placeholder={`${t("placeholderEmailInput")}`}
              onChange={handleEmailChange}
              data-cy="signupEmailInput" />
          </FormField>
          <FormField>
            <FormInput
              type="password"
              value={password}
              placeholder={`${t("placeholderPasswordInput")}`}
              onChange={handlePasswordChange}
              data-cy="signupPasswordInput" />
          </FormField>
          <FormField>
            <FormInput
              type="password"
              value={rePassword}
              placeholder={`${t("placeholderRepasswordInput")}`}
              onChange={handleRepasswordChange}
              data-cy="signupRepasswordInput" />
          </FormField>
          <ButtonsContainer>
            <Button type="submit" variants={variants} whileHover="hover" data-cy="submitSignup">
              {t("buttonSignup")}
            </Button>
            {/* <Button variants={variants} whileHover="hover" style={{backgroundColor:"#fff", color: "#000", display: 'flex', alignItems:"center", justifyContent:"space-around"}} onClick={handleGithubLogin}>
              Registrarse con GitHub
              <Image src={githubIcon} alt="github icon"/>
            </Button> */}
          </ButtonsContainer>
          <FormSubtitle>{t("warningNAHA")}
            <Link to="/" style={{ color: "#f8b500" }}>
              <motion.p variants={variants} whileHover="hover" style={{ padding: 8, margin: 0 }}>{t("buttonLogin")}</motion.p>
            </Link>
          </FormSubtitle>
        </form>
        <ToastContainer />
      </FormContainer>
    </Container>
  );
};