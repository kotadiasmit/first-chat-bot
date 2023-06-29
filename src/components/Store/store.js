import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducer";

const store = configureStore({
  reducer: {
    chatStore: taskReducer,
  },
});
export default store;
