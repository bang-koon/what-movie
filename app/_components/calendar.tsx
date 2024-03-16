"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../main.module.scss";
import { setDate } from "../store/calendarSlice";
import { Value } from "react-calendar/dist/cjs/shared/types";

const MyCalendar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: { calendar: { date: string } }) => state.calendar.date
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // for react-calender's MaxDate
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleDateChange = (date: Value) => {
    dispatch(setDate(formatDate(date as Date)));
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleOutsideClick = (event: React.MouseEvent | MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCalendarOpen]);

  return (
    <div>
      <p onClick={toggleCalendar}>날짜</p>
      {isCalendarOpen && (
        <div ref={calendarRef} className={styles.calendarContainer}>
          <Calendar
            className={styles.calendar}
            onChange={handleDateChange}
            value={selectedDate}
            selectRange={false}
            maxDate={yesterday}
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
