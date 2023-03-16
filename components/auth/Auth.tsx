import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { useRouter } from 'next/router';

interface IProps{
    currentLeft:boolean;
}

const Auth:React.FC<IProps> = ({currentLeft}) => {
    // 카카오로 첫 로그인일 경우 유저정보 받기
    const router = useRouter()
    const kakaoSignUp = router.query.firstLogin as string;

    return (
        <div>
            {currentLeft? <Login/>
            : <SignUp kakaoSignUp={kakaoSignUp}/> 
            }
        </div>
    );
};

export default Auth;