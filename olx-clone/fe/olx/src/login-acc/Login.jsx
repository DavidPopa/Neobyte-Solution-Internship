/* eslint-disable react/no-unescaped-entities */
import { Fragment, useState } from "react";
import clasess from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const [logInUser, setLogInUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/logIn",
        logInUser
      );
      if (response.data.error) {
        console.log("Error logging in:", response.data.message);
      } else {
        console.log("Logged in successfully!");
        navigate(`/main/${response.data.userId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  console.log(logInUser);
  return (
    <Fragment>
      <div className={clasess.container}>
        <div className={clasess.form}>
          <form className={clasess.formular}>
            <div className={clasess.email}>
              <label className={clasess.label}>Email</label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={logInUser.email} // Use logInUser.email instead of setLogInUser.email
                onChange={(e) =>
                  setLogInUser({ ...logInUser, email: e.target.value })
                }
                className={clasess.input}
              />
            </div>
            <div className={clasess.password}>
              <label className={clasess.label}>Password</label>
              <input
                type="password"
                required
                placeholder="*******"
                value={logInUser.password} // Use logInUser.password instead of setLogInUser.password
                onChange={(e) =>
                  setLogInUser({ ...logInUser, password: e.target.value })
                }
                className={clasess.input}
              />
            </div>
            <button className={clasess.submit} onClick={sendData}>
              Log In
            </button>
            <p>
              No account? Let's make one <Link to="/">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
