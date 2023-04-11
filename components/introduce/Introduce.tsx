import React, { useState } from 'react';
import LogoIcon from "../../public/static/svg/index/logo.svg"
import styled from 'styled-components';
import palette from '../../styles/palette';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../types/reduxState';
import Button from '../common/Button';

const Container = styled.div`
    height:100vh;
    background-color:white;
    padding:150px 0px;
    text-align:center;
    /* background-color:${palette.pc_background}; */
    background-color:transparent;

    .introduce-text{
        margin-top:80px;
        p{
            font-size:25px;
            font-weight:bold;
        }
        p:nth-child(1){
            margin-right:40px;
        }
        p:nth-child(2){
            margin-top:20px;
            margin-left:40px;
            span{
                font-size:30px;
                color:${palette.input_focus};
            }
        }
    }
    
    .startBtn{
        margin-top:170px;
    }
`

const Introduce = () => {
    const user:UserState = useSelector((state:RootState):UserState=>state.user)
    const isLogged = user.isLogged;
    const linkAsIsLogged = ()=>{
        return isLogged ? "home" : "auth"
    }

    return (
        <Container>
            <LogoIcon/>
            <div className='introduce-text'>
                <p>대학생활에 필요한 물건들을</p>
                <p>주변 학생들과 <span>공유</span>해보세요</p>
            </div>
            <div className='startBtn'>
                <Link href={linkAsIsLogged()}>
                    <Button width='260px' height='60px' radius='30px'>로그인</Button>
                </Link>
            </div>
        </Container>
    );
};

export default Introduce;