import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  table: "OrderLists",
};

const PersonalSideBarSlice = createSlice({
  name: "personalSideBarSlice",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setPersonalSideBar: (state, action) => {
      state.table = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setPersonalSideBar,
} = PersonalSideBarSlice.actions;

export default PersonalSideBarSlice.reducer;
