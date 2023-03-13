//* users.json에 저장된 유저 타입 - 서버
export type StoredUserType = {
    id:number;
    userName: string;
    userNickname: string;
    email: string;
    password: string;
    university: string;
    birthDay:string;
    profileImage: string;
    location:string;
    latitude:number;
    longitude:number;

  };
  
  // password값 지운 유저타입 - 클라이언트
  export type UserType = {
    id:number;
    userName: string;
    userNickname: string;
    email: string;
    university: string;
    birthDay:string;
    profileImage: string;
    location:string;
    latitude:number;
    longitude:number;
  };
  