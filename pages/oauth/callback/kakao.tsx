//Kakao.js
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useDispatch } from 'react-redux';
import { userActions } from './../../../store/user';
import { useRouter } from 'next/router';

const Kakao = (query:any) => {
    const authCode = query.code;

    // 로그인 시 유저정보 저장
    const dispatch = useDispatch();
    const router = useRouter();

    const getUserInfo = async (authCode:string)=>{
        const response = await axios.post("http://localhost:4000/auth/kakao",
        {code:authCode})
        console.log(response)
        if(response.data){
            if(response.data.user.university){
                // 유저정보에서 대학교 데이터가 있다면 로그인시키기 
                dispatch(userActions.setLoggedUser(response.data.user))
                localStorage.setItem('login-token', response.data.token);
                router.push('/home')
            }else{
                // 유저정보에서 대학교 데이터가 없다면 카카오 첫 로그인이라는 뜻 > 회원가입 페이지로 보내기
                localStorage.setItem('login-token', response.data.token);
                dispatch(userActions.setLoggedUser(response.data.user))
                router.push({
                    pathname:'/auth',
                    query:{firstLogin:true}
                })
            }
        }
    }
    useEffect(()=>{
        getUserInfo(authCode);
    },[])

    return (
        <div>
        <div>
            <p>잠시만 기다려 주세요! 로그인 중입니다.</p>
        </div>
        </div>
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