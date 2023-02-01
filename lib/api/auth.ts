import axios from '../../lib/api';
import { UserType } from '../../types/user';

// 회원가입 body
interface SignUpAPIBody{
    userName:string;
    userNickname:string;
    studentID:string;
    email:string;
    password:string;
    university:string;
    birthDay:string
}
// 회원가입 api
export const signupAPI = (body:SignUpAPIBody)=>axios.post<UserType>("/api/auth/signup",body)

// 로그인 api
export const loginAPI = (body:{email:string;password:string})=>
    axios.post<UserType>("api/auth/login",body)