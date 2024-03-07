import { createSlice } from "@reduxjs/toolkit";

interface CalendarState {
  date: string;
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const initialState: CalendarState = {
  date: formatDate(yesterday),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
