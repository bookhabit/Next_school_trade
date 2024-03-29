import { registerLocation } from "../types/location";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userBackgroundColor = {
  firstColor: string;
  secondColor: string;
};

const initialState: userBackgroundColor = {
  firstColor: "#E8FFE5",
  secondColor: "#F1FFF0",
};

const userBackground = createSlice({
  name: "setUserColor",
  initialState,
  reducers: {
    setFirstColor(state, action: PayloadAction<string>) {
      state.firstColor = action.payload;
    },
    setSecondColor(state, action: PayloadAction<string>) {
      state.secondColor = action.payload;
    },
  },
});

export const userBackgroundActions = { ...userBackground.actions };

export default userBackground;
