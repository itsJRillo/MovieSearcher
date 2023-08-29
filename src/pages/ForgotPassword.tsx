import React, { useState } from 'react';
import PocketBase from 'pocketbase';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../styles/backgroundAnimation.css';

import { ToastContainer, toast } from 'react-toastify';
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
  width: 95%;
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

export default function ForgotPassword() {
    const { t } = useTranslation();
    const pb = new PocketBase('https://shoten-api.pockethost.io');
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await pb.collection('users').requestPasswordReset(email);
            console.log(await pb.collection('users').requestPasswordReset(email));
            
            toast.success(t("resetMessage"), {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            
            navigate(`/confirm-password-reset/${pb.authStore.token}`)
        } catch (error: any) {
            toast.error(error.response.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };

    const variants = {
        hover: {
            scale: 1.01,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <Container data-cy="forgotPasswordContainer">
            <FormContainer>
                <TextContainer>
                    <FormTitle>{t("forgotPasswordTitle")}</FormTitle>
                    <FormSubtitle>
                        {t("forgotPasswordSubtitle")}
                    </FormSubtitle>
                </TextContainer>

                <form onSubmit={handleSubmit}>
                    <FormField>
                        <FormInput
                            type="email"
                            value={email}
                            placeholder={t("placeholderEmailInput")}
                            onChange={handleEmailChange}
                            data-cy="inputEmailReset"
                        />
                    </FormField>
                    <ButtonsContainer>
                        <Button type="submit" variants={variants} whileHover="hover" data-cy="submitReset">
                            {t("resetPasswordButton")}
                        </Button>
                    </ButtonsContainer>
                    <FormSubtitle>
                        <div>
                            <Link to="/" style={{ color: '#f8b500' }}>
                                <motion.p variants={variants} whileHover="hover" style={{ padding: 8, margin: 0 }} data-cy="toSignInButton">{t("returnLogin")}</motion.p>
                            </Link>
                        </div>
                    </FormSubtitle>
                </form>
                <ToastContainer />
            </FormContainer>
        </Container>
    );
};