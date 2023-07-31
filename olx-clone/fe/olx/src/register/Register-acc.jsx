import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clasess from "./Register.module.css";
import axios from "axios";
export default function Register() {
  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const sendData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createAccount",
        createUser
      );
      console.log(response);
      if (response.data) {
        console.log("User account created successfully!");
        navigate("/login");
      } else {
        console.log("Error creating user account:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating user account:", error);
    }
  };
  console.log(createUser);
  return (
    <Fragment>
      <div className={clasess.container}>
        <div className={clasess.form}>
          <form className={clasess.formular}>
            <div className={clasess.name}>
              <label className={clasess.label}>Name</label>
              <input
                type="text"
                required
                placeholder="Jhon Deer"
                value={createUser.name}
                onChange={(e) =>
                  setCreateUser({ ...createUser, name: e.target.value })
                }
                className={clasess.input}
              />
            </div>
            <div className={clasess.email}>
              <label className={clasess.label}>Email</label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={createUser.email}
                onChange={(e) =>
                  setCreateUser({ ...createUser, email: e.target.value })
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
                value={createUser.password}
                onChange={(e) =>
                  setCreateUser({ ...createUser, password: e.target.value })
                }
                className={clasess.input}
              />
            </div>
            <button className={clasess.submit} onClick={sendData}>
              Create Account
            </button>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
