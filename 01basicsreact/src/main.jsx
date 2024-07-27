import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout.jsx";
import BuyNow from "./Buy-Now/BuyNow.jsx";
import ShowMore from "./Show-More/ShowMore.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectRoute from "./services/ProtectRoute.jsx";
import Home from "./Home.jsx";

// import App from "./App.jsx";

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
      path: "/buy", // Ensure the path here is "/buy"
      element: (
        <ProtectRoute>
          <BuyNow />
        </ProtectRoute>
      ),
    },
    {
      path: "/show",
      element: (
        <ProtectRoute>
          <ShowMore />
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
