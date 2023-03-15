import axios from '../../lib/api';
import { UserType } from '../../types/user';

// 회원가입 body
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
// 회원가입 api
export const signupAPI = (body:SignUpAPIBody)=>axios.post<UserType>("http://localhost:4000/auth/local/signup",body)

// 로그인 api
export const loginAPI = (body:{email:string;password:string})=>
    axios.post<UserType>("api/auth/login",body)

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = ()=> axios.get<UserType>("api/auth/me");

// 로그아웃 api
export const logoutAPI = ()=> axios.delete("/api/auth/logout")