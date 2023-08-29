import React, { useState } from 'react';
import PocketBase from 'pocketbase';

import { Link } from 'react-router-dom';
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

export default function ResetPassword() {
    const { t } = useTranslation();

    const pb = new PocketBase('https://shoten-api.pockethost.io');

    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await pb.collection('users').confirmPasswordReset(
                pb.authStore.token,
                'NEW_PASSWORD',
                'NEW_PASSWORD_CONFIRM',
            );
            toast.success(t("resetMessage"), {
                position: toast.POSITION.BOTTOM_RIGHT
            });
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
        <Container data-cy="resetPasswordContainer">
            <FormContainer>
                <TextContainer>
                    <FormTitle>{t("resetPasswordTitle")}</FormTitle>
                    <FormSubtitle>
                        {t("resetPasswordSubtitle")}
                    </FormSubtitle>
                </TextContainer>

                <form onSubmit={handleSubmit}>
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
                        <Button type="submit" variants={variants} whileHover="hover" data-cy="submitReset">
                            {t("resetNewPassword")}
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