import React from 'react';

export const DeleteEventModal = ({ onDelete, eventText, onClose , eventTitle, eventDate,eventEnd }) => {
  return(
    <>
      <div id="deleteEventModal">
        <h2>{eventTitle}</h2>

        {/* <p id="eventText">{eventText}</p> */}
       
        <p>Event Starts From: {eventDate}</p>
        <p>Event Ends: {eventEnd}</p>

        <button onClick={onDelete} id="deleteButton">Delete</button>
        <button onClick={onClose} id="closeButton">Close</button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
