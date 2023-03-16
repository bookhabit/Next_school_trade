//Kakao.js
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Kakao = () => {
    console.log('리다이렉트 성공')
  
    // URL에서 인가 코드 가져오기
    // let code = new URL(window.location.href);
    // const KAKAO_CODE = code.searchParams.get("code");

    // 인가코드 백엔드에 넘기기
    // const AUTHORIZE_CODE = KAKAO_CODE;

    // 카카오 로그인 수행 후 로그인상태변경과 메인화면 이동
    useEffect(()=>{
    // 로그인 +  백엔드 서버에 유저 정보 요청하기
        const getUserInfo = async (AUTHORIZE_CODE:any)=>{
        let response
        try {
            response = await axios.post("http://localhost:4000/auth/kakao",
            {code:AUTHORIZE_CODE})
        } catch(e) {
            console.log(e);
        };
        try{
            // 유저정보에서 이메일만 있다면 회원가입 페이지로 이동시켜서 유저정보 입력받기 + currentLeft 설정과 카카오 로그인시라고 알려주는 방법 찾기
        }catch(e){
            console.log(e)
        }
        // 유저정보에서 이메일 외 다른 정보가 있다면 기존회원 > 로그인시키기
        console.log("유저정보가져오기:", response);
        // 로컬 스토리지에 token 저장
        
        // 리덕스에 User데이터 저장
        
        }
        // getUserInfo(AUTHORIZE_CODE)
    },[])

    return (
        <div>
        <div>
            <p>잠시만 기다려 주세요! 로그인 중입니다.</p>
        </div>
        </div>
    );
    };

export default Kakao;