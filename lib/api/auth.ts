import { LoginFormValues } from '../../components/auth/FormLogin';
import axios from '../../lib/api';
import { LoggedUserType } from '../../types/user';

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
export const kakaoSignupAPI = (body:KakaoSignUpAPIBody)=>
axios.post<LoggedUserType>("http://localhost:4000/auth/kakao/signup",
                body,
                {
                    withCredentials: true,
                })

// 로그인 api - <LoggedUserType>
export const loginAPI =  async (body:LoginFormValues)=>
    await axios.post("http://localhost:4000/auth/local/signin",body)

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = ()=> axios.post("http://localhost:4000/user/islogin",{withCredentials: true,});

// 로컬스토리지의 access_token의 유저 정보를 받아오는 api
export const getUserInfo = (token:string)=>axios.post("http://localhost:4000/user/islogin",{
        headers: {Authorization: token,}
    }
)

// 로그아웃 api
export const logoutAPI = ()=> axios.delete("/api/auth/logout")