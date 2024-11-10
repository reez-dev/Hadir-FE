import { createSlice } from "@reduxjs/toolkit";

export interface BoolState {
  value: boolean;
}

const initialState: BoolState = {
  value: false,
};

export const BoolSlice = createSlice({
  name: "genericBool",
  initialState,
  reducers: {
    setBool: (state, action) => {
      state.value = action.payload;
    },
    resetBool: (state) => {
      state.value = false;
    },
  },
});

export const { setBool, resetBool } = BoolSlice.actions;
export default BoolSlice.reducer;
