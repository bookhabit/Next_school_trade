import { LoginFormValues } from '../../components/auth/FormLogin';
import axios from '../../lib/api';
import { LoggedUserType } from '../../types/user';
import { SignUpAPIBody } from '../../types/auth';
import { KakaoSignUpAPIBody } from '../../types/auth';

// 로컬 회원가입 api
export const signupAPI = (body:SignUpAPIBody)=>axios.post<LoggedUserType>("http://localhost:4000/auth/local/signup",body)

// 카카오 회원가입 api
export const kakaoSignupAPI = (body:KakaoSignUpAPIBody)=>
axios.post<LoggedUserType>("http://localhost:4000/auth/kakao/signup",
                body,
                {
                    withCredentials: true,
                })

// 로그인 api - <LoggedUserType>
export const loginAPI =  async (body:LoginFormValues)=>
    await axios.post("http://localhost:4000/auth/local/signin",body)

// 로그아웃 api
export const logoutAPI = ()=> axios.delete("/api/auth/logout")