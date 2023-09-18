import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notificaitions } from "../types/alarm";

type alarmState = {
  alarmList:Notificaitions[];
};

// 초기상태
const initialState: alarmState = {
    alarmList:[]
};

const alarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
      // 알람 리스트 설정하기
      setAlarmList(state, action: PayloadAction<Notificaitions[]>) {
        state.alarmList = action.payload;
      },
      // 알람 초기화하기
      initAlarmList(state) {
        state.alarmList=[]
      },
  },
});

export const AlarmActions = { ...alarm.actions };

export default alarm;
