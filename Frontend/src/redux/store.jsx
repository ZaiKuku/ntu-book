import { configureStore } from "@reduxjs/toolkit";
import OpenLoginSlice from "./openLogin"; // 创建你的 rootReducer
import PersonalSideBarSlice from "./setPersonalSideBar"; // 创建你的 rootReducer


const store = configureStore({
  reducer: {
    OpenLoginSlice: OpenLoginSlice,
    PersonalSideBarSlice: PersonalSideBarSlice,
  },
});

export default store;
