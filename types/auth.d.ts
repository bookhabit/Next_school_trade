// 로컬 회원가입 body
export interface SignUpAPIBody{
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
export interface KakaoSignUpAPIBody{
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

// react-hook-form 회원가입 input 폼
export type SignUpFormValues = {
    name:string;
    nickname: string;
    email: string;
    password:string;
    confirmPassword:string;
    university:string;
    inputGender:string;
    birthMonth:string;
    birthDay:string;
    birthYear:string;
    location:string,
    latitude:number,
    longitude:number
}

// react-hook-form 로그인 input 폼
export type LoginFormValues={
    email:string;
    password:string;
}

type authForm = SignUpFormValues | LoginFormValues