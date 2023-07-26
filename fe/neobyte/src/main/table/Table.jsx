import { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import Nav from "../navigator/Nav";
import debounce from "lodash.debounce";
import classes from "./table.module.css";
const Table = () => {
  const [dropdownValueOption, setDropdownValueOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedHandleSend = useCallback(
    debounce(async (option, value) => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/api/data", {
          params: {
            option,
            value,
          },
        });
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedHandleSend(dropdownValueOption, inputValue);
  }, [debouncedHandleSend, dropdownValueOption, inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValueOption(e.target.value);
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
              value={dropdownValueOption}
              className={classes.request}
              onChange={handleDropdownChange}
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
              className={classes.input}
              type="text"
              required
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div className={classes["table-container"]}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </Fragment>
    // <div>
    //   <div>
    // <select value={dropdownValueOption} onChange={handleDropdownChange}>
    //   <option value="First Name">First Name</option>
    //   <option value="Last Name">Last Name</option>
    //   <option value="Company">Company</option>
    //   <option value="City">City</option>
    //   <option value="Country">Country</option>
    //   <option value="Subscription Date">Subscription Date</option>
    //   <option value="Website">Website</option>
    // </select>
    // <input
    //   type="text"
    //   required
    //   value={inputValue}
    //   onChange={handleChange}
    // />
    //   </div>
    //   <div>
    //     {isLoading ? (
    //      c
    //     ) : (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>First Name</th>
    //             <th>Last Name</th>
    //             <th>Company</th>
    //             <th>City</th>
    //             <th>Country</th>
    //             <th>Subscription Date</th>
    //             <th>Website</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {tableData.map((customer) => (
    //             <tr key={customer._id}>
    //               <td>{customer["First Name"]}</td>
    //               <td>{customer["Last Name"]}</td>
    //               <td>{customer["Company"]}</td>
    //               <td>{customer["City"]}</td>
    //               <td>{customer["Country"]}</td>
    //               <td>{customer["Subscription Date"]}</td>
    //               <td>{customer["Website"]}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     )}
    //   </div>
    // </div>
  );
};

export default Table;
