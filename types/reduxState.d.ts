import UserType  from "./user";


// 유저 redux state
export type UserState = UserType & {
    idLogged:boolean;
}

// 공통 redux state
export type CommonState= {
    validateMode:boolean;
}