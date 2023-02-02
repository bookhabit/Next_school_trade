import React from 'react';
import AuthUserProfile from './AuthUserProfile';
import AuthForm from './AuthForm';
import styled from 'styled-components';
import palette from '../styles/palette';
import { useSelector } from 'react-redux';

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
    /* 로그인한 경우 헤더 유저 프로필 스타일링 */
    .header-user-profile{
        display:flex;
        align-items:center;
        height:42px;
        padding:0 6px 0 16px;
        border:0;
        box-shadow:0px 1px 2px rgba(0,0,0,0.18);
        border-radius:21px;
        background-color:white;
        cursor: pointer;
        outline:none;
        &:hover{
            box-shadow:0px 2px 8px rgba(0,0,0,0.12);
        }
    }
    .header-user-profile-image{
        margin-left:8px;
        width:30px;
        height:30px;
        border-radius:50%;
    }
    /* 유저메뉴 */
    .header-usermenu {
            position: absolute;
            right: 0;
            top: 52px;
            width: 240px;
            padding: 8px 0;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            background-color: white;
            li {
            display: flex;
            align-items: center;
            width: 100%;
            height: 42px;
            padding: 0 16px;
            cursor: pointer;
            &:hover {
                background-color: ${palette.gray_f7};
            }
            }
            .header-usermenu-divider {
            width: 100%;
            height: 1px;
            margin: 8px 0;
            background-color: ${palette.gray_dd};
            }
        }
`

const Auth = () => {
    //  로그인 안되어있으면 input창 - AuthForm 
    //  로그인 되어있으면 유저프로필 - AuthUserProfile
    const user = useSelector((state:any)=>state.user);
    return (
        <Container>
            <button className='myStore'>내 상점</button>
            {!user.isLogged&&(<AuthForm/>)}
            {user.isLogged&&(<AuthUserProfile/>)}
        </Container>
    );
};

export default Auth;