import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Registernow,
  Password,
  password,
  LoginNow,
} from "../Components/String";
import MyButton from "../Components/MyButton";
import InputComponent from "../Components/InputComponent";
import styles from "../Register/Register.module.css";

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
    <div className={styles.registerpage}>
      <div className={styles.leftside}>
        <div className={styles.registercontainer}>
          <div className={styles.conatinorRegister}>
            <div className={styles.header}>
              <div className={styles.text}>Log-In</div>
              <div className={styles.underline}></div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <img src="../../assets/password.png" alt="password icon" />
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
            <MyButton className={styles.submitcontainor} onClick={handlelogin}>
              {LoginNow}
            </MyButton>
            <span className={styles.Spanregister}>
              Don't Have An Account?
              <span className={styles.spanreg} onClick={HandleRegisteration}>
                {Registernow}
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

export default Login;
