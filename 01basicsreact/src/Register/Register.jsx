import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    Number: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      localStorage.setItem("user", JSON.stringify(input));
      navigate("/login");
    }
  };

  const validateInput = () => {
    setError("");

    if (!input.name) {
      setError("Enter valid name");
      return false;
    } else if (!input.email) {
      setError("Enter valid email");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      setError("Enter valid email");
      return false;
    } else if (!/^[0-9]{10}$/.test(input.Number)) {
      setError("Enter valid Number");
      return false;
    } else if (!input.password) {
      setError("Enter valid password");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="left-side">
        <div className="register-container">
          <div className="conatinor-Register">
            <div className="header-Register">
              <div className="text-Register">Sign-up</div>
              <div className="underline-Register"></div>
            </div>
            <div className="inputs-Register">
              <div className="input-Register">
                <img src="../../assets/person.png" alt="person icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-Register">
                <img src="../../assets/email.png" alt="email icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  value={input.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-Register get-otp-container">
                <img src="../../assets/password.png" alt="password icon" />
                <span className="get-otp">Get OTP</span>
                <input
                  type="number"
                  name="Number"
                  placeholder="Mobile Number"
                  value={input.Number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-Register eye-open-img">
                <img
                  src={
                    isPasswordVisible
                      ? "../../assets/eye-open.png"
                      : "../../assets/eye-close.png"
                  }
                  alt="toggle visibility"
                  className="eyeopen"
                  onClick={togglePasswordVisibility}
                />
                <img src="../../assets/password.png" alt="password icon" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <p className="error-message">{error}</p>
            <button className="submit-containor" onClick={handleSubmit}>
              Register Now
            </button>
            <span className="Spanregister">
              Already Have An Account?
              <span className="span-reg" onClick={handleLoginRedirect}>
                Login Now
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <img src="../../assets/login.webp" alt="Background" />
      </div>
    </div>
  );
};

export default Register;
