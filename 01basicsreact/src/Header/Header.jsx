import React from "react";
import styles from "./Header.module.css";

import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.menuicon}>
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className={styles.hedaerleft}>
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
