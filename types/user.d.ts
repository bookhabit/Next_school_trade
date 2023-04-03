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
    nickname:string;
    password:string;
    university:string;
    updatedAt:string;
    // profile_image추가해야함
  }