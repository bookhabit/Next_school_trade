import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

type favoriteModalState = {
  showFavoriteModal: boolean;
};

// 초기상태
const initialState: favoriteModalState = {
  showFavoriteModal: false,
};

const favorite = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    // validateMode 변경하기
    setShowFavoriteModal(state, action: PayloadAction<boolean>) {
      state.showFavoriteModal = action.payload;
    },
  },
});

export const favoriteActions = { ...favorite.actions };

export default favorite;
