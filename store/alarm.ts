import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

type chatlState = {
  chatting: boolean;
  chattingModal:boolean;
  alarmPage:boolean;
};

// 초기상태
const initialState: chatlState = {
    chatting: false,
    chattingModal:false,
    alarmPage:false,
};

const alarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    // validateMode 변경하기
    setChatting(state, action: PayloadAction<boolean>) {
      state.chatting = action.payload;
    },
    setChattingModal(state, action: PayloadAction<boolean>) {
      state.chattingModal = action.payload;
    },
    setAlarmPage(state, action: PayloadAction<boolean>) {
      state.alarmPage = action.payload;
    },
  },
});

export const alarmActions = { ...alarm.actions };

export default alarm;
