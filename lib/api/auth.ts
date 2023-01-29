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
    major:string;
    birthDay:string
}
// 회원가입 api
export const signupAPI = (body:SignUpAPIBody)=>axios.post<UserType>("/api/auth/signup",body)