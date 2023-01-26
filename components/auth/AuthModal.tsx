import React from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';



const AuthModal = () => {
    // authMode에 따라 회원가입창 로그인창
    return (
        <>
            <SignUpModal/>
            <LoginModal/>
        </>
    );
};

export default AuthModal;