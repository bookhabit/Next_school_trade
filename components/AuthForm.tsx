import React from 'react';
import AuthModal from './auth/AuthModal';
import styled from 'styled-components';
import palette from '../styles/palette';
import useModal from './../hooks/useModal';

const Container = styled.div`
        .header-sign-up-button{
            height:42px;
            margin-right:8px;
            padding:0 16px;
            border:0;
            border-radius:21px;
            background-color:white;
            cursor: pointer;
            outline:none;
            &:hover{
                background-color:${palette.gray_f7}
            }
        }
        .header-login-button{
            height:42px;
            padding:0 16px;
            border:0;
            box-shadow:0px 1px 2px rgba(0,0,0,0.18);
            border-radius:21px;
            background-color:white;
            cursor: pointer;
            outline:none;
            &:hover{
                box-shadow:0px 2px 8px rgba(0,0,0,0.12)
            }
        }
`


const AuthForm = () => {
    const {openModal,ModalPortal} = useModal();
    return (
        <Container>
            <div className="header-auth-buttons">
                <button type="button" className="header-sign-up-button"
                onClick={openModal}
                >
                    회원가입
                </button>
                <button type="button" className="header-login-button"
                >
                    로그인
                </button>
            </div>
            
            <ModalPortal >
                <AuthModal/>
            </ModalPortal>
            
        </Container>
    );
};

export default AuthForm;