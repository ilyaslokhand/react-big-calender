import React from "react";

import Home from "./Home.jsx";
import Header from "./Header/Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import "./index.css";

function Layout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Home />
    </div>
  );
}

export default Layout;
