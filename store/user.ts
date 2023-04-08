import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../types/user";
import { UserState } from "../types/reduxState";

// 초기상태
const initialState:UserState = {
    id:0,
    name:"",
    nickname:"",
    studentID:"",
    email:"",
    university:"",
    major:"",
    birth:"",
    isLogged:false,
    profileImage:"",
    contents:[]
}

const user = createSlice({
    name:"user",
    initialState,
    reducers:{
        // 로그인한 유저 변경하기
        setLoggedUser(state,action:PayloadAction<UserState>){
            state = {...action.payload,isLogged:true}
            return state;
        },
        // 유저 초기화하기
        initUser(state){
            state = initialState;
            return state;
        }
    }
})

export const userActions = {...user.actions}

export default user;