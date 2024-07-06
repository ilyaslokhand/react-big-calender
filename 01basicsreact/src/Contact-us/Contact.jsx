import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="containor">
      <div className="logo-1">
        <img src="../../assets/Call-Silhouette-PNG-Clipart.png"></img>
        <div className="text-1">
          <h3>Lets Chat</h3>
          <p>
            Monday To Saturday<br></br>1-9PM
          </p>
        </div>
      </div>
      <div className="logo-2">
        <img src="../../assets/WhatsApp_icon.png.webp"></img>
        <div className="text-1">
          <h3>Call Us On</h3>
          <p>
            8005645047<br></br>1-9PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
