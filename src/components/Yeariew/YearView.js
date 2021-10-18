// import logo from "./logo.svg";
import "../../App.css";
import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { Day } from "../Day/Day";
import { NewEventModal } from "../NewEventModal/NewEventModal";
import { DeleteEventModal } from "../DeleteEventModal/DeleteEventModal";
import { useDate } from "../Hooks/useDate";
const YearView = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );
  const arrayTwo = ["January", 1, 2, 3, 4, 5, 6, 7, 8, "October", 10, 11];

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
      <div className="calendar">
        {years.map((mt) => (
          <div id="container">
            <h1>{mt.monthName}</h1>
            <div id="weekdays">
              <div>Sunday</div>
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
              <div>Saturday</div>
            </div>

            <div id="calendar">
              {mt.daysArr.map((d, index) => (
                <Day
                  key={index}
                  day={d}
                  onClick={() => {
                    if (d.value !== "padding") {
                      setClicked(d.date);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {clicked && !eventForDate(clicked) && (
        // clicked &&
        <NewEventModal
          date={clicked}
          onClose={() => setClicked(null)}
          onSave={(title, endDate) => {
            setEvents([...events, { title, date: clicked, endDate: endDate }]);
            setClicked(null);
            /*Here I will fetch my Calendar api */
            // fetch()
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={
            eventForDate(clicked).title +
            " " +
            "Start Date: " +
            eventForDate(clicked).date +
            " End Date: " +
            eventForDate(clicked).endDate
          }
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </div>
  );
};
export default YearView;
