import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { Day } from "../Day/Day";
import { NewEventModal } from "../NewEventModal/NewEventModal";
import { DeleteEventModal } from "../DeleteEventModal/DeleteEventModal";
import { useDate } from "../Hooks/useDate";

const MonthView = () => {
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
  console.log(days,arrayTwo.indexOf(dateDisplay.split(" ")[0]));

    return (
        <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />
        <div>
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
            {days.map((d, index) => (
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
       
      </div>

      {clicked && !eventForDate(clicked) && (
        // clicked &&
        <NewEventModal
          date={clicked}
          onClose={() => setClicked(null)}
          onSave={(title, endDate) => {
            setEvents([...events, { title, date: clicked, endDate: endDate }]);
            setClicked(null);
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
          eventTitle = {eventForDate(clicked).title}
          eventDate = {eventForDate(clicked).date}
          eventEnd = { eventForDate(clicked).endDate}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
    )
}

export default MonthView
