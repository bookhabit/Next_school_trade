import { registerLocation } from "../types/location";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:registerLocation={
    // 위치
    location:"",
    // 위도
    latitude:0,
    // 경도
    longitude:0,
}

const registerPosition = createSlice({
    name:"registerPosition",
    initialState,
    reducers:{
        setLocation(state,action:PayloadAction<string>){
            state.location = action.payload
        },
        //* 위도 변경하기
        setLatitude(state, action: PayloadAction<number>) {
            state.latitude = action.payload;
        },
        //* 경도 변경하기
        setLongitude(state, action: PayloadAction<number>) {
            state.longitude = action.payload;
        },
    }
})

export const registerPositionActions = {...registerPosition.actions}

export default registerPosition