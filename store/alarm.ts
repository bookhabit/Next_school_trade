import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type alarmState = {
  alarm:boolean
};

// 초기상태
const initialState: alarmState = {
    alarm:false
};

const alarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    // validateMode 변경하기
    setAlarm(state, action: PayloadAction<boolean>) {
      state.alarm = action.payload;
    },
  },
});

export const AlarmActions = { ...alarm.actions };

export default alarm;
