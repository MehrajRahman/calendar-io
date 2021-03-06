import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { CalendarHeader } from "./components/CalendarHeader/CalendarHeader";
import { Day } from "./components/Day/Day";
import { NewEventModal } from "./components/NewEventModal/NewEventModal";
import { DeleteEventModal } from "./components/DeleteEventModal/DeleteEventModal";
import { useDate } from "./components/Hooks/useDate";
import MonthView from "./components/MonthView/MonthView";
import YearView from "./components/Yeariew/YearView";

function App() {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );
  const [view, setView] = useState("year")
  const arrayTwo = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  console.log(
    days,
    arrayTwo.indexOf(dateDisplay.split(" ")[0]),
    dateDisplay,
    events,
    useDate(events, nav)
  );

  /**My Code starting from here */
  const months = [];
  const low = nav - arrayTwo.indexOf(dateDisplay.split(" ")[0]);
  const high = 12 - arrayTwo.indexOf(dateDisplay.split(" ")[0]);

  // const [dateDisplay, setDateDisplay] = useState('');
  // const [days, setDays] = useState([]);
  const years = [];

  for (let i = low; i < high; i++) {
    months.push(i);
  }

  const getMonths = (months, years) => {
    const eventForDate = (date) => events.find((e) => e.date === date);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dt = new Date();

    months.map((mt) => {
      if (mt !== 0) {
        dt.setMonth(new Date().getMonth() + mt);
      }

      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = `${dt.toLocaleDateString("en-us", {
        month: "long",
      })} ${year}`;
      const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      console.log(
        `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`
      );
      const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
      const monthObj = {
        monthName: monthName,
        daysArr: [],
      };
      // const daysArr = [];

      for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
          monthObj.daysArr.push({
            value: i - paddingDays,
            event: eventForDate(dayString),
            isCurrentDay: i - paddingDays === day && mt === 0,
            date: dayString,
          });
        } else {
          monthObj.daysArr.push({
            value: "padding",
            event: null,
            isCurrentDay: false,
            date: "",
          });
        }
      }

      console.log(year);
      years.push(monthObj);
    });

    // setDays(daysArr);
    console.log(years);

    return {
      days,
      dateDisplay,
    };
  };

  getMonths(months, years);

  console.log(months);

  return (
    <div>
 <button onClick={()=>setView("year")} id="backButton">Year</button>
        <button onClick={()=>setView("month")} id="nextButton">Month</button>
        {
         view && view === "year" ? <YearView></YearView>: <MonthView></MonthView>
        }
  
    </div>
  );
}

export default App;
