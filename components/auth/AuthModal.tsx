import React from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface IProps{
    closeModal:()=> void;
}

const AuthModal:React.FC<IProps> = ({closeModal}) => {

    // authMode에 따라 회원가입창 로그인창
    const authMode = "signup"
    return (
        <>
        {authMode?<SignUpModal closeModal={closeModal}/> :<LoginModal/>}
        </>
    );
};

export default AuthModal;