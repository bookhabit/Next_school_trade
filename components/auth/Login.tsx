import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MailIcon from "../../public/static/svg/auth/email.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import KakaoBtn from "../../public/static/svg/auth/kakao_login.svg"
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { userActions } from './../../store/user';
import { loginAPI } from "../../lib/api/auth";
import { useRouter } from 'next/router';
import { AxiosError } from "axios";

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
    width:100%;
    text-align:center;
    cursor: pointer;
    img{
      width:100%;
    }
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

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // 에러메시지 상태
    const [errorMessage,setErrorMessage] = useState("")

    // 비밀번호 토글 state
    const [hidePassword,setHidePaddword] = useState(true);
    
    const {setValidateMode} = useValidateMode()

    const dispatch = useDispatch();

    // 이메일 주소 onchange
    const onChangeEmail = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value)
        setErrorMessage("")
    }

    // 비밀번호 onchange
    const onChangePassword = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value)
        setErrorMessage("")
    }

    // 비밀번호 숨김 토글 함수
    const toggleHidePassword = ()=>{
        setHidePaddword(!hidePassword)
    }

    const router = useRouter();

    // 로그인 버튼 클릭 시 API호출
    const onSubmitLogin = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        setValidateMode(true)

        if(!email||!password){
            console.log("이메일과 비밀번호를 모두 입력해주세요.")
        }else{
            const loginBody = {email,password}
            
            try{
                const {data} = await loginAPI(loginBody)
                dispatch(userActions.setLoggedUser(data.user))

                router.push("/")
            }catch(e:any){
                // data에 있는 상태코드에 따라 에러메시지 출력
                console.log('에러',e)
                // 백엔드 연결 X - 네트워크에러
                if(e.code === "ERR_NETWORK"){
                  setErrorMessage("서버와 제대로 연결하지 못하였습니다")
                }else if(e.response.status === 404){
                  // 해당 이메일의 유저가 없을 때
                  setErrorMessage(e.response.data.message)
                } else if(e.response.status === 401){
                  // 유저의 비밀번호가 일치하지 않을 때
                  setErrorMessage(e.response.data.message)
                }                
            }
        }
    }

    // 환경변수 설정

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=account_email`

    // 카카오 로그인 - 인가코드 받기
    const kakaoLogin = ()=>{
      window.location.href = KAKAO_AUTH_URL
    }

    useEffect(()=>{
        return ()=>{
            setValidateMode(false)
        }
    },[])
    
    return (
        <Container onSubmit={onSubmitLogin}>
          <div className="login-input-wrapper">
            <Input
              placeholder="이메일 주소"
              name="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              icon={<MailIcon />}
              usevalidation
              isValid={!!email}
              errorMessage={"이메일을 입력해주세요"}
            />
          </div>
          <div className="login-input-wrapper login-password-input-wrapper">
            <Input
              placeholder="비밀번호 입력"
              name="password"
              type={hidePassword ? "password" : "text"}
              icon={hidePassword? (
                <ClosedEyeIcon onClick={toggleHidePassword}/>
            ):(
                <OpenedEyeIcon onClick={toggleHidePassword}/>
                )}
              value={password}
              onChange={onChangePassword}
              usevalidation
              isValid={!!password}
              errorMessage={"비밀번호를 입력해주세요"}
            />
          </div>
          <div className="input-error-message">
            <p>{errorMessage}</p>
          </div>
          <div className="login-submit-button-wrapper">
            <Button type="submit" width='100%' height='52px'radius='10px' >
              로그인
            </Button>
          </div>
          <div className="kakao-btn" onClick={kakaoLogin}>
                <img src={"/static/svg/auth/kakao_login.svg"} alt="카카오로그인"/>
          </div>
        </Container>
      );
};

export default Login;