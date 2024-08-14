import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
const CheckOut = (openSidebarToggle, OpenSidebar) => {
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
    </div>
  );
};

export default CheckOut;
