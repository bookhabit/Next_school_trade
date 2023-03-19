//* users.json에 저장된 유저 타입 - 서버 (테스트)
export type StoredUserType = {
    id:number;
    name: string;
    nickname: string;
    email: string;
    password: string;
    university: string;
    gender:number;
    birth:string;
    profileImage: string;
    location:string;
    latitude:number;
    longitude:number;

  };
  
  // password값 지운 유저타입 - 클라이언트 (테스트)
  export type UserType = {
    id:number;
    name: string;
    nickname: string;
    email: string;
    university: string;
    gender:number;
    birth:string;
    // profileImage: string;
    location:string;
    latitude:number;
    longitude:number;
  };
  
  // local-login 응답값
  export type LoggedUserType = {
    token:string;
    isLogged:boolean;
    user:object;
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
    password:string;
    university:string;
    updatedAt:string;
  }