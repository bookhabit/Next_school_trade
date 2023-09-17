import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type alarmState = {
  alarm:number;
};

// 초기상태
const initialState: alarmState = {
    alarm:0
};

const alarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    // validateMode 변경하기
    setAlarm(state, action: PayloadAction<number>) {
      state.alarm = action.payload;
    },
  },
});

export const AlarmActions = { ...alarm.actions };

export default alarm;
