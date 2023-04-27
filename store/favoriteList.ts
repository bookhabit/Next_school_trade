import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { productListType } from '../types/product/product';

interface favoriteListType{
    favoriteList:productListType[]
}

// 초기상태
const initialState:favoriteListType = {
    favoriteList:[]
}

const favoriteList = createSlice({
    name:"favoriteList",
    initialState,
    reducers:{
        setFavoriteList(state, action: PayloadAction<productListType[]>) {
            state.favoriteList = action.payload;
          }
    }
})

export const favoriteListActions = {...favoriteList.actions};

export default favoriteList;