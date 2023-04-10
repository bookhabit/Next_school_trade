import { productListType } from "./product/product";

  // local-login 응답값
  export type LoggedUserType = {
    token:string;
    isLogged:boolean;
    user:Users;
  }

  // owner
  export type Users = {
    birth:string;
    createdAt:string;
    deleteAt:string;
    email:string;
    gender:number;
    grade:number;
    id:number;
    latitude:number;
    location:string;
    longitude:number;
    name:string;
    nickname:string;
    password:string;
    university:string;
    updatedAt:string;
    // profile_image추가해야함
  }

  // 로그인 확인했을 때 유저정보 저장
    export type LoggedUsers = {
    birth:string;
    createdAt:string;
    deleteAt:string;
    email:string;
    gender:number;
    grade:number;
    id:number;
    latitude:number;
    location:string;
    longitude:number;
    name:string;
    nickname:string;
    password:string;
    university:string;
    updatedAt:string;
    contents:productListType[];
    // profile_image추가해야함
  }