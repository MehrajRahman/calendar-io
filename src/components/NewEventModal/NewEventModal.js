import React, { useState } from 'react';

export const NewEventModal = ({date, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(false);

  return(
    <>
      <div id="newEventModal">
        <h2>New Event</h2>

        <input 
          className={error ? 'error' : ''}
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          id="eventTitleInput" 
          placeholder="Event Title" 
        />
        <input 
          className={error ? 'error' : ''}
          value={date} 
          id="eventTitleInput" 
          placeholder="Event Title" 
        />
        <input 
          className={error ? 'error' : ''}
          value={endDate}
          type="date" 
          onChange={e => setEndDate(e.target.value)} 
          id="eventTitleInput" 
          placeholder="End Date" 
        />

        <button 
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title, endDate, date);
            } else {
              setError(true);
            }
          }} 
          id="saveButton">Save</button>


        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
