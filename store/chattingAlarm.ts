import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";
import { RoomType } from "../pages/user/chatting/[id]";

type chatState = {
  chatting: boolean;
  chattingModal:boolean;
  chattingRoom:RoomType|undefined;
  chatting_user_name:string;
  chatting_message:string;
  chatting_product_title:string;
  chatting_product_price:string;
};

// 초기상태
const initialState: chatState = {
    chatting: false,
    chattingModal:false,
    chattingRoom:undefined,
    chatting_user_name:'',
    chatting_message:'',
    chatting_product_title:'',
    chatting_product_price:'',
};

const chattingAlarm = createSlice({
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
    setChattingRoom(state, action: PayloadAction<RoomType|undefined>) {
      state.chattingRoom = action.payload;
    },
    setChattingUserName(state,action:PayloadAction<string>){
      state.chatting_user_name = action.payload;
    },
    setChattingMessage(state,action:PayloadAction<string>){
      state.chatting_message = action.payload;
    },
    setChattingProductTitle(state,action:PayloadAction<string>){
      state.chatting_product_title = action.payload;
    },
    setChattingProductPrice(state,action:PayloadAction<string>){
      state.chatting_product_price = action.payload;
    },
  },
});

export const chattingAlarmActions = { ...chattingAlarm.actions };

export default chattingAlarm;
