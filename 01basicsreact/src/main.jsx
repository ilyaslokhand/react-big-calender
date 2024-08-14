import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectRoute from "./services/ProtectRoute.jsx";
import Home from "./Home/Home.jsx";
import Garden from "./GardenBooking/Garden.jsx";
import Room from "./RoomBooking/Room.jsx";
import TodaysBooking from "./BookingPages/TodaysBooking.jsx";
import CheckOut from "./BookingPages/CheckOut.jsx";
import Layout from "./Layout/layout.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Garden",
      element: (
        <ProtectRoute>
          <Garden />
        </ProtectRoute>
      ),
    },
    {
      path: "/Room",
      element: (
        <ProtectRoute>
          <Room />
        </ProtectRoute>
      ),
    },
    {
      path: "/TodaysBooking",
      element: (
        <ProtectRoute>
          <TodaysBooking />
        </ProtectRoute>
      ),
    },
    {
      path: "/CheckOut",
      element: (
        <ProtectRoute>
          <CheckOut />
        </ProtectRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectRoute>
          <Layout />
        </ProtectRoute>
      ),
      children: [
        {
          path: "homepage",
          element: <Home />,
        },
      ],
    },
  ],
  { basename: "/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
