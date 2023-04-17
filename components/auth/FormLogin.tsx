import React, {  useState } from "react";
import styled from "styled-components";
import MailIcon from "../../public/static/svg/auth/email.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import KakaoBtn from "../../public/static/svg/auth/kakao_login.svg"
import palette from "../../styles/palette";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useDispatch } from "react-redux";
import { userActions } from './../../store/user';
import { loginAPI } from "../../lib/api/auth";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import {DevTool} from "@hookform/devtools"
import { LoggedUserType } from "../../types/user";

const Container = styled.form`
  width: 100%; // 모바일버전
  padding: 180px 20px;
  z-index: 11;
  
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  .login-input-wrapper {
    width:100%;
    position: relative;
    margin-bottom: 30px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-submit-button-wrapper {
    width:100%;
    margin:30px 0px;
    padding-bottom: 16px;
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
  .kakao-btn{
    text-align:center;
    cursor: pointer;
  }
  /* 에러메시지 스타일링 */
  .input-error-message{
        margin-top:8px;
        font-weight:600;
        font-size:14px;
        color:${palette.tawny};

        p{
            color:${palette.tawny};
            font-weight:600;
            font-size:14px;
       }
    }

`;

export type LoginFormValues={
  email:string;
  password:string;
}

let renderCount = 0

const FormLogin = () => {
    // react-hook-form
    const {control,handleSubmit} = useForm<LoginFormValues>({
      defaultValues:{
          email:"",
          password:"",
      }
    });
    
    // 에러메시지 상태
    const [errorMessage,setErrorMessage] = useState("")

    // 비밀번호 토글 state
    const [hidePassword,setHidePaddword] = useState(true);

    const dispatch = useDispatch();
    const router = useRouter();

    // 비밀번호 숨김 토글 함수
    const toggleHidePassword = ()=>{
        setHidePaddword(!hidePassword)
    }


    // 로그인 버튼 클릭시 react-hook-form api호출
    const onSubmitFormLogin: SubmitHandler<LoginFormValues> = async (formValue) => {
      // api 호출한 다음 try catch문으로 이메일 일치하지 않을 시와 비밀번호 일치하지 않을 때 유효성 검사체크하기
      try{
        if(formValue){
          const response = await loginAPI(formValue) 
          const data:LoggedUserType = response.data
          dispatch(userActions.setLoggedUser(data.user))
          router.push("/")
        }
    }catch(e:any){
        // data에 있는 상태코드에 따라 에러메시지 출력
        console.log('에러',e.response)
        // 해당 이메일의 유저가 없을 때
        if(e.response.status === 404){
            setErrorMessage(e.response.data.message)
        }
        // 유저의 비밀번호가 일치하지 않을 때
        if(e.response.status === 401){
            setErrorMessage(e.response.data.message)
        }
    }
    };

    // 환경변수 설정
    const KAKAO_REST_API_KEY= "1e71e50aa0333c4fc579cf84718fdd4b"

    const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao"

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`

    // 카카오 로그인 - 인가코드 받기
    const kakaoLogin = ()=>{
      window.location.href = KAKAO_AUTH_URL
    }

    renderCount++
    return (
        <Container onSubmit={handleSubmit(onSubmitFormLogin)}>
          <h1>Login Form ({renderCount/2})</h1>
          <div className="login-input-wrapper">
            <FormInput
              placeholder="이메일 주소"
              icon={<MailIcon />}
              name="email" 
              control={control} 
              rules={{
                required:{
                    value:true,
                    message:"E-mail is required"
                },
                pattern:{
                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email format",
                }
            }}
            />
          </div>
          <div className="login-input-wrapper login-password-input-wrapper">
            
            <FormInput
              placeholder="비밀번호 입력"
              name="password" 
              type={hidePassword ? "password" : "text"}
              icon={hidePassword? (
                <ClosedEyeIcon onClick={toggleHidePassword}/>
                 ):(
                <OpenedEyeIcon onClick={toggleHidePassword}/>
                )}
                control={control} 
                rules={{
                  required:{
                      value:true,
                      message:"Password is required"
                  }
              }}
            />
          </div>
          <div className="input-error-message">
            <p>{errorMessage}</p>
          </div>
          <div className="login-submit-button-wrapper">
            <Button type="submit" width='100%' height='42px'radius='10px' >
              로그인
            </Button>
          </div>
          <div className="kakao-btn" onClick={kakaoLogin}>
                <img src={"/static/svg/auth/kakao_login.svg"} alt="카카오로그인"/>
          </div>
          <DevTool control={control} />
        </Container>
      );
};

export default FormLogin;