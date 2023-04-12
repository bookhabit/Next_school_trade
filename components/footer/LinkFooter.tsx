import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import HomeIcon from "../../public/static/svg/footer/home.svg"
import RegisterIcon from "../../public/static/svg/footer/register.svg"
import UserIcon from "../../public/static/svg/footer/user.svg"
import ChattingIcon from "../../public/static/svg/footer/chatting.svg"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Container = styled.div`
    position:fixed;
    bottom:0;      
    background-color:${palette.main_color};
    width:100%;
    max-width:430px;
    height:60px;
    
    .link-flex-wrap{
        display:flex;
        justify-content:space-evenly;
        .link-flex-item{
            cursor: pointer;
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
    const router = useRouter();
    // 로그인 확인
    const isLogged = useSelector((state:RootState)=>state.user.isLogged)
    return (
        <Container>
            <div className='link-flex-wrap'>
                <div className='link-flex-item' onClick={()=>{
                    router.push({
                        pathname:"/"
                    })
                }}>
                    <HomeIcon/>
                    <p>홈</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        router.push({
                            pathname:"/product/register"
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                }}>
                    <RegisterIcon/>
                    <p>등록</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        router.push({
                            pathname:"/user/chatting"
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                }}>
                    <ChattingIcon/>
                    <p>채팅</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        router.push({
                            pathname:"/user"
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                }}>
                     <UserIcon/>
                    <p>내정보</p>
                </div>
            </div>
        </Container>
    );
};

export default LinkFooter;