//Kakao.js
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

const Kakao = (query:any) => {
    console.log('리다이렉트 성공')
    console.log('인가코드',query.code)
    const authCode = query.code;

    const getUserInfo = async (authCode:string)=>{
        console.log('api 요청')
        const response = await axios.post("http://localhost:4000/auth/kakao",
        {code:authCode})
        console.log(response)
        // 유저정보에서 이메일만 있다면 회원가입 페이지로 이동시켜서 유저정보 입력받기 + currentLeft 설정과 카카오 로그인시라고 알려주는 방법 찾기

        // 유저정보에서 이메일 외 다른 정보가 있다면 기존회원 > 로그인시키기

        // 로컬 스토리지에 token 저장
        
        // 리덕스에 User데이터 저장
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