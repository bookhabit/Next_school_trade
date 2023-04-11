import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`
interface IProps{
    currentLeft:boolean;
}

const Auth:React.FC<IProps> = ({currentLeft}) => {
    // 카카오로 첫 로그인일 경우 유저정보 받기
    const router = useRouter()
    const kakaoSignUp = router.query.firstLogin as string;

    return (
        <Container>
            {currentLeft? <Login/>
            : <SignUp kakaoSignUp={kakaoSignUp}/> 
            }
        </Container>
    );
};

export default Auth;