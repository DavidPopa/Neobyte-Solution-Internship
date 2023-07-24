import Nav from "../navigator/Nav";
import classes from "./table.module.css";
import axios from "axios";
import { Fragment, useState } from "react";
import debounce from "lodash.debounce";

export default function Table() {
  const [dropdownValueOption, setDropdownValueOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState([]);

  const debouncedHandleSend = debounce(handleSend, 500); 

  async function handleSend() {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:4000/api/data",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          option: dropdownValueOption,
          value: inputValue,
        },
      });
      console.log(response.data);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
    debouncedHandleSend();
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes["nav-part"]}>
          <Nav />
        </div>
        <div className={classes["content-part"]}>
          <div className={classes["heading-input"]}>
            <select
              className={classes.request}
              value={dropdownValueOption}
              onChange={(e) => {
                setDropdownValueOption(e.target.value);
                debouncedHandleSend(); 
              }}
            >
              <option value="First Name">First Name</option>
              <option value="Last Name">Last Name</option>
              <option value="Company">Company</option>
              <option value="City">City</option>
              <option value="Country">Country</option>
              <option value="Subscription Date">Subscription Date</option>
              <option value="Website">Website</option>
            </select>
            <input
              type="text"
              required
              className={classes.input}
              value={inputValue}
              onChange={handleChange}
            />
            {/* Remove the onClick handler from the button */}
            <button className={classes.send}>Send</button>
          </div>
          <div className={classes["table-container"]}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Company</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Subscription Date</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer["First Name"]}</td>
                    <td>{customer["Last Name"]}</td>
                    <td>{customer["Company"]}</td>
                    <td>{customer["City"]}</td>
                    <td>{customer["Country"]}</td>
                    <td>{customer["Subscription Date"]}</td>
                    <td>{customer["Website"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
