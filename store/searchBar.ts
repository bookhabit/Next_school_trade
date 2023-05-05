import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchBarState = {
  value: string;
};

const initialState: SearchBarState = {
  value: "",
};

const searchBar = createSlice({
  name: "setSearchInput",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const searchBarActions = { ...searchBar.actions };

export default searchBar;
