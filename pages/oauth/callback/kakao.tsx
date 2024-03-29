//Kakao.js
import React from "react";
import axios from "../../../lib/api";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useDispatch } from 'react-redux';
import { userActions } from './../../../store/user';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Loading from "../../../components/common/Loading";

const Container = styled.div`
`

const Kakao = (query:any) => {
    const authCode = query.code;

    // 로그인 시 유저정보 저장
    const dispatch = useDispatch();
    const router = useRouter();

    const getUserInfo = async (authCode:string)=>{
        try{
            const response = await axios.post("/auth/kakao",
            {code:authCode})
            console.log(response)
            if(response.data){
                if(response.data.user.university){
                    // 유저정보에서 대학교 데이터가 있다면 로그인시키기 
                    dispatch(userActions.setLoggedUser(response.data.user))
                    localStorage.setItem('login-token', response.data.token);
    
                    router.push('/')
                }else{
                    // 유저정보에서 대학교 데이터가 없다면 카카오 첫 로그인이라는 뜻 > 회원가입 페이지로 보내기
                    localStorage.setItem('login-token', response.data.token);
                    dispatch(userActions.setLoggedUser(response.data.user))
                    alert('첫 로그인 시 기본정보만 입력해주세요')
                    router.push({
                        pathname:'/auth',
                        query:{firstLogin:true}
                    })
                }
            }
        }catch(e:any){
            console.log('카카오 로그인 에러',e)
            alert(e.code)
            router.push('/auth')
        }
    }
    useEffect(()=>{
        getUserInfo(authCode);
    },[])

    return (
        <Container>
            <Loading/>
        </Container>
    );
    };

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async (context) => {
    try{
        const {code} = context.query;
        console.log(code)
        return {
            props : {
                code
            }
        }
    } catch(err){
        console.log(err);
        return {
            props : {},
        }
    }
}

export default Kakao;