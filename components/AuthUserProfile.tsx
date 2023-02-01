import React from 'react';
import styled from 'styled-components';
import HambergerIcon from "../public/static/svg/header/hambergerIcon.svg";
import { useSelector } from 'react-redux';

const Container = styled.div`
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
`

const AuthUserProfile = () => {
    const userProfileImage = useSelector((state:any) => state.user.profileImage);
    return (
        <>
            <Container>
                <button type='button' className='header-user-profile'>
                    <HambergerIcon/>
                    <img src={userProfileImage} className="header-user-profile-image" alt=""/>
                </button>
            </Container>
        </>
    );
};

export default AuthUserProfile;