import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Calendar.css";
import moment from "moment";
import Modal from "react-modal";

const localizer = momentLocalizer(moment);

const BuyNow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedGarden, setSelectedGarden] = useState(null);

  const events = [
    {
      start: moment("2024-07-06T12:00:00").toDate(),
      end: moment("2024-07-06T13:00:00").toDate(),
      title: "hello",
    },
  ];

  const handleDateSelect = (date) => {
    setStartDate(date);
    setModalIsOpen(true);
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date);
  };

  const handleGardenSelect = (garden) => {
    setSelectedGarden(garden);
    setModalIsOpen(false);

    // Logic to update events array with booked slots from startDate to endDate for selected garden
    // Example: Update the events array with new booked slot
    const newEvent = {
      start: startDate,
      end: endDate,
      title: `Booked - ${selectedGarden}`, // Example title, customize as needed
    };

    const updatedEvents = [...events, newEvent];
    // Update state or call API to update backend with new event data
    console.log("Updated Events:", updatedEvents);
  };

  return (
    <div className="custom-calendar" style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 50 }}
        onSelectSlot={handleDateSelect}
        selectable
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Book Slot Modal"
      >
        <h2>Select End Date</h2>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateSelect(e.target.value)}
        />
        <h2>Select Garden</h2>
        <div>
          <input
            type="radio"
            id="garden1"
            name="garden"
            value="Garden 1"
            onChange={() => handleGardenSelect("Garden 1")}
          />
          <label htmlFor="garden1">Garden 1</label>
        </div>
        <div>
          <input
            type="radio"
            id="garden2"
            name="garden"
            value="Garden 2"
            onChange={() => handleGardenSelect("Garden 2")}
          />
          <label htmlFor="garden2">Garden 2</label>
        </div>
        {/* Add more garden options as needed */}
      </Modal>
    </div>
  );
};

export default BuyNow;
