import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [input, Setinput] = useState({
    Number: "",
    password: "",
  });

  const handlelogin = (e) => {
    e.preventDefault();

    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      input.Number === loggeduser.Number &&
      input.password === loggeduser.password
    ) {
      localStorage.setItem("loggedin", true);
      navigate("/home/homepage");
    } else {
      setError("wrong Number or password");
    }
  };

  const HandleRegisteration = () => {
    navigate("/");
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    Setinput({ ...input, [name]: value });
  };

  return (
    <div className="register-page">
      <div className="left-side">
        <div className="register-container">
          <div className="conatinor-Register">
            <div className="header-Register">
              <div className="text-Register">Log-In</div>
              <div className="underline-Register"></div>
            </div>
            <div className="inputs-Register">
              <div className="input-Register ">
                <img src="../../assets/password.png" alt="password icon" />
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
            <button className="submit-containor" onClick={handlelogin}>
              Login Now
            </button>
            <span className="Spanregister">
              Don't Have An Account?
              <span className="span-reg" onClick={HandleRegisteration}>
                Register Now
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

export default Login;
