import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 添加你的 state 属性
  query: {
    BookName: "python",
    AuthorName: null,
    CourseName: null,
    DeptCode: null,
    ISBN: null,
  },
};

const FilterConditionSlice = createSlice({
  name: "filterConditionSlice",
  initialState,
  reducers: {
    // 添加你的 reducer actions
    setFilterCondition: (state, action) => {
      const { searchby, query } = action.payload;
      state.query[searchby] = query;
      Object.keys(state.query).forEach((key) => {
        if (key !== searchby) {
          state.query[key] = null;
        }
      });
    },

    setDeptCode: (state, action) => {
      state.query.DeptCode = action.payload;
    },
  },
});

export const {
  // 添加你的 reducer actions
  setFilterCondition,
  setDeptCode,
} = FilterConditionSlice.actions;

export default FilterConditionSlice.reducer;
