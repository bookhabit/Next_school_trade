import React from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useSelector } from '../../store';

interface IProps{
    closeModal:()=> void;
}

const AuthModal:React.FC<IProps> = ({closeModal}) => {
    // authMode에 따라 회원가입창 로그인창
    const authMode = useSelector((state:any)=>state.auth.authMode)
    return (
        <>
        {authMode==="signup"&&<SignUpModal closeModal={closeModal}/>}
        {authMode==="login"&& <LoginModal closeModal={closeModal} />}
        </>
    );
};

export default AuthModal;