// store.js

import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
