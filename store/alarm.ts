import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

type chatlState = {
  chatting: boolean;
  review:boolean;
};

// 초기상태
const initialState: chatlState = {
    chatting: true,
    review:false,
};

const alarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    // validateMode 변경하기
    setChatting(state, action: PayloadAction<boolean>) {
      state.chatting = action.payload;
    },
    setReview(state, action: PayloadAction<boolean>) {
      state.review = action.payload;
    },
  },
});

export const alarmActions = { ...alarm.actions };

export default alarm;
