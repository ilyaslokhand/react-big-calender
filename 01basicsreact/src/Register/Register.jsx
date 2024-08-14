import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import InputComponent from "../Components/InputComponent";
import {
  text,
  LoginNow,
  ALREADYLOGINNOW,
  Registernow,
  Password,
  password,
  EMAIL,
  EMAILADDRESS,
} from "../Components/String";
import MyButton from "../Components/MyButton";

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
    <div className={styles.registerpage}>
      <div className={styles.leftside}>
        <div className={styles.registercontainer}>
          <div className={styles.conatinorRegister}>
            <div className={styles.header}>
              <div className={styles.text}>Sign-up</div>
              <div className={styles.underline}></div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <img src="../../assets/person.png" alt="person icon" />
                <InputComponent
                  type={text}
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.input}>
                <img src="../../assets/email.png" alt="email icon" />
                <InputComponent
                  type={EMAIL}
                  name="email"
                  placeholder={EMAILADDRESS}
                  value={input.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${styles.input} ${styles.getotpcontainer}`}>
                <img src="../../assets/password.png" alt="password icon" />
                <span className={styles.getotp}>Get OTP</span>
                <InputComponent
                  type="number"
                  name="Number"
                  placeholder="Mobile Number"
                  value={input.Number}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${styles.input} ${styles.eyeopenimg}`}>
                <img
                  src={
                    isPasswordVisible
                      ? "../../assets/eye-open.png"
                      : "../../assets/eye-close.png"
                  }
                  alt="toggle visibility"
                  className={styles.eyeopen}
                  onClick={togglePasswordVisibility}
                />
                <img src="../../assets/password.png" alt="password icon" />
                <InputComponent
                  type={isPasswordVisible ? text : password}
                  name={password}
                  placeholder={Password}
                  value={input.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <p className={styles.errormessage}>{error}</p>
            <MyButton className={styles.submitcontainor} onClick={handleSubmit}>
              {Registernow}
            </MyButton>
            <span className={styles.Spanregister}>
              {ALREADYLOGINNOW}
              <span className={styles.spanreg} onClick={handleLoginRedirect}>
                {LoginNow}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.rightside}>
        <img src="../../assets/login.webp" alt="Background" />
      </div>
    </div>
  );
};

export default Register;
