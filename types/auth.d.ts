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
