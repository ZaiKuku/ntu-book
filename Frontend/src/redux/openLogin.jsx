import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  openLogin: false,
};

const OpenLoginSlice = createSlice({
  name: "openLoginSlice",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setOpenLogin: (state, action) => {
      state.openLogin = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setOpenLogin,
} = OpenLoginSlice.actions;

export default OpenLoginSlice.reducer;
