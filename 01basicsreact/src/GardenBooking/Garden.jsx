import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "./Garden.module.css";

import moment from "moment";
import Modal from "react-modal";
Modal.setAppElement("#root");
import MyButton from "../Components/MyButton";

import {
  CLOSE,
  REMOVEVENT,
  EditEvent,
  ROOM1,
  ROOM2,
  ROOM3,
  Garden1,
  Garden2,
  Garden3,
  Room,
  UPDATEVENT,
  ADDEVENT,
  GARDEN,
  NAME,
  EMAIL,
  MOBILENUMBER,
  ENDDATE,
  NONE,
  BLOCK,
  ONE,
  TWO,
  THREE,
  BUTTON,
  submit,
  DATE,
  MOBNUM,
  text,
  EMAILADDRESS,
  ViewEvent,
  ADDNAME,
} from "../Components/String";
import InputComponent from "../Components/InputComponent";

const localizer = momentLocalizer(moment);

const Garden = (props) => {
  const { isRoomSelection } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [garden, setGarden] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [view, setview] = useState("month");
  const [errorPopupIsOpen, setErrorPopupIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const colorScale = ["blue", "orange", "green", "red", "purple", "pink"];

  const assignEventColor = (date) => {
    const eventCount = events.filter((event) =>
      moment(event.start).isSame(date, "day")
    ).length;

    return colorScale[eventCount % colorScale.length];
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  const handleRemoveEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    handleCloseModal();
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectStartDate(slotInfo.start);
    setSelectEndDate(slotInfo.start);
    setIsUpdating(false);
    setModalIsOpen(true);
    setIsEditable(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
    setEmail(event.email);
    setGarden(event.garden);
    setMobile(event.mobile);
    setName(event.name);
    setSelectStartDate(event.start);
    setSelectEndDate(event.end);
    setIsUpdating(true);
    setIsEditable(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
    setGarden("");
    setSelectStartDate("");
    setSelectEndDate("");
    setName("");
    setEmail("");
    setMobile("");
    setIsEditable(false);
  };

  const handleGardenChange = (e) => {
    setGarden(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectEndDate(new Date(e.target.value));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    const isRoomAvailable = events.every((event) => {
      if (garden === event.garden) {
        return (
          new Date(selectEndDate) < new Date(event.start) ||
          new Date(selectStartDate) > new Date(event.end)
        );
      }
      return true;
    });

    if (!isRoomAvailable) {
      setErrorMessage("This room is already booked for the selected dates.");
      setErrorPopupIsOpen(true);
      return;
    }

    const newEvent = {
      start: new Date(selectStartDate),
      end: new Date(selectEndDate),
      allDay: true,
      title: `${
        isRoomSelection ? `Room ${garden}` : `Garden ${garden}`
      } ${name}`,
      email: email,
      garden: garden,
      mobile: mobile,
      name: name,
      color: assignEventColor(selectStartDate),
    };

    if (isUpdating) {
      setEvents(
        events.map((event) => (event === selectedEvent ? newEvent : event))
      );
    } else {
      setEvents([...events, newEvent]);
    }

    handleCloseModal();
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const handleViewChange = (view) => {
    setview(view);
  };

  const closeErrorPopup = () => {
    setErrorPopupIsOpen(false);
    setErrorMessage("");
    return;
  };

  const ErrorPopup = () => (
    <Modal
      isOpen={errorPopupIsOpen}
      onRequestClose={closeErrorPopup}
      contentLabel="error"
      className="modal-overlay"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: { background: "transparent", padding: 0, border: "none" },
      }}
    >
      <div className="modal-content">
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={closeErrorPopup}>Close</button>
      </div>
    </Modal>
  );

  return (
    <div className={styles.customcalendar}>
      <Calendar
        localizer={localizer}
        events={events}
        view={view}
        views={["month"]}
        onView={handleViewChange}
        startAccessor="start"
        endAccessor="end"
        s
        style={{
          margin: "0 auto",
          height:
            "96%" /* Ensures the calendar uses the full height available */,
          display: modalIsOpen ? "none" : "block",
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel={ADDEVENT}
        className={styles.modaloverlay}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: { background: "transparent", padding: 0, border: "none" },
        }}
      >
        <div className={styles.modalcontent}>
          <div className={styles.modalform}>
            <h2>{selectedEvent ? ViewEvent : ADDEVENT}</h2>
            <form onSubmit={handleAddEvent}>
              <label>
                {ADDNAME}
                <InputComponent
                  type={text}
                  value={name}
                  placeholder={ADDNAME}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditable}
                  required
                />
              </label>

              <label>
                {EMAILADDRESS}
                <InputComponent
                  type={text}
                  value={email}
                  placeholder={EMAILADDRESS}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditable}
                  required
                />
              </label>

              <label>
                {MOBNUM}
                <InputComponent
                  type={text}
                  value={mobile}
                  placeholder={MOBNUM}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={!isEditable}
                  required
                />
              </label>
              <label>
                {isRoomSelection ? Room : GARDEN}

                <select
                  onChange={handleGardenChange}
                  value={garden}
                  required
                  disabled={!isEditable}
                >
                  <option value="">
                    Select {isRoomSelection ? Room : GARDEN}
                  </option>
                  {isRoomSelection ? (
                    <>
                      <option value={ONE}>{ROOM1}</option>
                      <option value={TWO}>{ROOM2}</option>
                      <option value={THREE}>{ROOM3}</option>
                    </>
                  ) : (
                    <>
                      <option value={ONE}>{Garden1}</option>
                      <option value={TWO}>{Garden2}</option>
                      <option value={THREE}>{Garden3}</option>
                    </>
                  )}
                </select>
              </label>
              <label>
                {ENDDATE}
                <InputComponent
                  type={DATE}
                  onChange={handleEndDateChange}
                  disabled={!isEditable}
                  value={
                    selectEndDate
                      ? moment(selectEndDate).format("YYYY-MM-DD")
                      : ""
                  }
                />
              </label>

              <div className={styles.buttongroup}>
                {isEditable ? (
                  <MyButton type={submit}>
                    {isUpdating ? UPDATEVENT : ADDEVENT}
                  </MyButton>
                ) : (
                  <MyButton
                    className={styles.secondary}
                    type={BUTTON}
                    onClick={handleEditEvent}
                  >
                    {EditEvent}
                  </MyButton>
                )}

                {isUpdating && (
                  <MyButton
                    type={BUTTON}
                    className={styles.secondary}
                    onClick={handleRemoveEvent}
                  >
                    {REMOVEVENT}
                  </MyButton>
                )}
                <MyButton
                  type={BUTTON}
                  className={styles.secondary}
                  onClick={handleCloseModal}
                >
                  {CLOSE}
                </MyButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <ErrorPopup />
    </div>
  );
};

export default Garden;
