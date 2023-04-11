import { registerLocation } from "../types/location";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userBackgroundColor={
    firstColor:string
    secondColor:string
}

const initialState:userBackgroundColor={
    firstColor:'#8edf71',
    secondColor:'#ea5e12'
}

const userBackground = createSlice({
    name:"registerPosition",
    initialState,
    reducers:{
        setFirstColor(state,action:PayloadAction<string>){
            state.firstColor = action.payload
        },
        setSecondColor(state,action:PayloadAction<string>){
            state.secondColor = action.payload
        },
    }
})

export const userBackgroundActions = {...userBackground.actions}

export default userBackground