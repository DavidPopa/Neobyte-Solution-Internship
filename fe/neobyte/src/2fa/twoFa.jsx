import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TwoFa() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("works");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("2FA Code:", code);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/verify-code",
        {
          code,
        }
      );
      if (response.data.error) {
        console.log("Verification error:", response.data.message);
        return;
      }

      console.log("Verification successful!");
      if (response.data.isCode) {
        navigate("/main");
        setError(true);
      } else {
        setError(false);
      }
    } catch (error) {
      console.log("API call error:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Two-Factor Authentication</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label className={classes.label}>
          Enter the code sent to your email to complete the login process.
          <input
            type="text"
            className={classes.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
        </label>
        {error && <p>Error</p>}
        <button type="submit" className={classes.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
