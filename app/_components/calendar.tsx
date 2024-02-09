"use client";
import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import styles from "../main.module.scss";

const MyCalendar = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState<LooseValue>(yesterday);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (date: LooseValue) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    console.log("Selected Date:", date);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as HTMLElement)
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
