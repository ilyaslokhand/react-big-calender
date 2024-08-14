import React from "react";
import styles from "./Sidebar.module.css";

import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const HandleHomeNavigate = () => {
    navigate("/home/homepage");
  };

  const HandleTodaysBooking = () => {
    navigate("/TodaysBooking");
  };

  const HandleCheckOutBooking = () => {
    navigate("/CheckOut");
  };

  return (
    <aside
      id={styles.sidebar}
      className={openSidebarToggle ? styles.sidebarresponsive : ""}
    >
      <div className={styles.sidebartitle}>
        <div className={styles.sidebarbrand}>
          <BsCart3 className={styles.iconheader} /> SHOP
        </div>
        <span
          className={`${styles.icon} ${styles.closeicon}`}
          onClick={OpenSidebar}
        >
          X
        </span>
      </div>

      <ul className={styles.sidebarlist}>
        <li className={styles.sidebarlistitem}>
          <a href="" onClick={HandleHomeNavigate}>
            <BsGrid1X2Fill className={styles.icon} /> Dashboard
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="" onClick={HandleTodaysBooking}>
            <BsFillArchiveFill className={styles.icon} /> Todays Booking
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="" onClick={HandleCheckOutBooking}>
            <BsFillGrid3X3GapFill className={styles.icon} /> CheckOut
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="">
            <BsPeopleFill className={styles.icon} /> Total-Booking
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="">
            <BsListCheck className={styles.icon} /> Earnings
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="">
            <BsMenuButtonWideFill className={styles.icon} /> Reports
          </a>
        </li>
        <li className={styles.sidebarlistitem}>
          <a href="">
            <BsFillGearFill className={styles.icon} /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
