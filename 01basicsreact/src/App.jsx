import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import headphone1 from "../assets/headphone1.png";

const App = () => {
  return (
    <>
      <div className="containor-1">
        <div className="text">
          <h1>
            The Westmire <br />
            <span>A56 Headset</span>
          </h1>
          <div className="buttons">
            <Link to="/buy">
              <button id="buy">Buy Now</button>
            </Link>
            <Link to="/show">
              <button id="show">Show All</button>
            </Link>
          </div>
        </div>
        <div className="image">
          <img src={headphone1} alt="Headphones" />
        </div>
      </div>
    </>
  );
};

export default App;
