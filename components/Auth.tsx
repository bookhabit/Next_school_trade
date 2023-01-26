import React from 'react';
import AuthUserProfile from './AuthUserProfile';
import AuthForm from './AuthForm';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
    /* 헤더창 */
    position:sticky;
    top:0;
    width:100%;
    height:60px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 80px;
    background-color:white;
    box-shadow:rgba(0,0,0,0.08) 0px 1px 12px;
    z-index:10;

    /* 헤더 좌측 내상점 스타일링 */
    .myStore{
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

const Auth = () => {
    //  로그인 안되어있으면 input창 - AuthForm 
    //  로그인 되어있으면 유저프로필 - AuthUserProfile
    return (
        <Container>
            <button className='myStore'>내 상점</button>
            {/* 로그인이 되어있는지에 따라 */}
            <AuthForm/>
            {/* <AuthUserProfile/> */}
        </Container>
    );
};

export default Auth;