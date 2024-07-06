import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const auth = localStorage.getItem("loggedin");

  return auth ? children : <Navigate to={"/login"} />;
};

export default ProtectRoute;
