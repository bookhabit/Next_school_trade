import axios from '../../lib/api';
import { LoggedUserType, UserType } from '../../types/user';

// 로컬 회원가입 body
interface SignUpAPIBody{
    name:string;
    nickname:string;
    email:string;
    password:string;
    university:string;
    gender:number;
    birth:string;
    location:string;
    latitude:number;
    longitude:number;
}

// 카카오 회원가입 body
interface KakaoSignUpAPIBody{
    name:string;
    nickname:string;
    email:string;
    university:string;
    gender:number;
    birth:string;
    location:string;
    latitude:number;
    longitude:number;
}

// 로컬 회원가입 api
export const signupAPI = (body:SignUpAPIBody)=>axios.post<LoggedUserType>("http://localhost:4000/auth/local/signup",body)

// 카카오 회원가입 api
export const kakaoSignupAPI = (body:KakaoSignUpAPIBody,token:string)=>
axios.post<LoggedUserType>("http://localhost:4000/auth/kakao/signup",
                body,
                {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                })

// 로그인 api
export const loginAPI = (body:{email:string;password:string})=>
    axios.post<LoggedUserType>("http://localhost:4000/auth/local/signin",body)

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = ()=> axios.get<UserType>("api/auth/me");

// 로컬스토리지의 access_token의 유저 정보를 받아오는 api
export const getUserInfo = (token:string)=>axios.post("http://localhost:4000/user/islogin",{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
)

// 로그아웃 api
export const logoutAPI = ()=> axios.delete("/api/auth/logout")