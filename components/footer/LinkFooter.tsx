import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import HomeIcon from "../../public/static/svg/footer/home.svg"
import RegisterIcon from "../../public/static/svg/footer/register.svg"
import UserIcon from "../../public/static/svg/footer/user.svg"
import ChattingIcon from "../../public/static/svg/footer/chatting.svg"

const Container = styled.div`
    position:sticky;
    bottom:0;      
    background-color:${palette.main_color};
    width:100%;
    height:60px;
    
    .link-flex-wrap{
        display:flex;
        justify-content:space-evenly;
        a{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            padding:10px;
        }

        p{
            margin-top:5px;
            font-size:13px;
            font-weight:bold;
            color:${palette.main_text_color}
        }
    }
    

`

const LinkFooter = () => {
    return (
        <Container>
            <div className='link-flex-wrap'>
                <Link href="/home">
                    <HomeIcon/>
                    <p>홈</p>
                </Link>
                <Link href="/registerProduct">
                    <RegisterIcon/>
                    <p>등록</p>
                </Link>
                <Link href="/user/chattingList">
                    <ChattingIcon/>
                    <p>채팅</p>
                </Link>
                <Link href="/user/myPage">
                    <UserIcon/>
                    <p>내정보</p>
                </Link>

            </div>
        </Container>
    );
};

export default LinkFooter;