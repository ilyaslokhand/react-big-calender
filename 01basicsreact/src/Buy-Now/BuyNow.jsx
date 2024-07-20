import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Calendar.css";
import moment from "moment";
import Modal from "react-modal";
Modal.setAppElement("#root");

const localizer = momentLocalizer(moment);

const BuyNow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [garden, setGarden] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [Selectedevent, setSelectedevent] = useState("");
  const [isUpdating, setisUpdating] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const today = new Date();
    setEvents(events.filter((event) => new date(Event.end) >= today));
  }, []);

  const handleremoveevent = () => {
    setEvents(events.filter((event) => event !== Selectedevent));
    handleCloseModal();
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectStartDate(slotInfo.start);
    setSelectEndDate(slotInfo.start);
    setisUpdating(false);
    setModalIsOpen(true);
  };

  const handleselectevent = (event) => {
    setSelectedevent(event);
    setModalIsOpen(true);
    setEmail(event.email);
    setGarden(event.garden);
    setMobile(event.mobile);
    setName(event.name);
    setSelectStartDate(event.start);
    setSelectEndDate(event.end);
    setGarden(event.garden);
    setisUpdating(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedevent("");
    setGarden("");
    setSelectStartDate("");
    setSelectEndDate("");
    setName("");
    setEmail("");
    setMobile("");
  };

  const handleGardenChange = (e) => {
    setGarden(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectEndDate(new Date(e.target.value));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      start: selectStartDate,
      end: selectEndDate,
      allDay: true,
      title: `Garden ${garden} ${name}`,
    };
    if (isUpdating) {
      setEvents(
        events.map((event) => (event === Selectedevent ? newEvent : event))
      );
    } else {
      setEvents([...events, newEvent]);
    }
    handleCloseModal();
  };

  return (
    <div className="custom-calendar" style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 50, display: modalIsOpen ? "none" : "block" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleselectevent}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add Event"
        className="modal-overlay"
        ClassName="modal-overlay"
        appElement={document.getElementById("root")}
      >
        <div className="modal-content">
          <div className="modal-form">
            <h2>{Selectedevent ? "view event" : "Add event"}</h2>
            <form onSubmit={handleAddEvent}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  placeholder="Add Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Mobile Number:
                <input
                  type="text"
                  value={mobile}
                  placeholder="Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </label>
              <label>
                Select Garden:
                <select onChange={handleGardenChange} value={garden} required>
                  <option value="">Select Garden</option>
                  <option value="1">Garden 1</option>
                  <option value="2">Garden 2</option>
                  <option value="3">Garden 3</option>
                </select>
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  onChange={handleEndDateChange}
                  value={
                    selectEndDate
                      ? moment(selectEndDate).format("YYYY-MM-DD")
                      : ""
                  }
                  required
                />
              </label>
              <div className="button-group">
                <button type="submit">
                  {isUpdating ? "Update Event" : "Add Event"}
                </button>
                {isUpdating && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={handleremoveevent}
                  >
                    Remove Event
                  </button>
                )}
                <button
                  type="button"
                  className="secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyNow;
