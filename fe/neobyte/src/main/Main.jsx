import { useState, Fragment } from "react";
import classes from "./main.module.css";
import Nav from "./navigator/Nav";
import axios from "axios";

export default function Main() {
  const [dropdownValueOption, setDropdownValueOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");

  const handleChange = (e) => {

    setDropdownValueOption(e.target.value);
  };

  const handleSend = async () => {
    if (dropdownValueOption === "POST") {
      setIsModalOpen(true);
    } else {
      performApiCall(dropdownValueOption, inputValue);
    }
  };

  const handleModalSend = async () => {
    setIsModalOpen(false);

    if (!jsonData || !isValidJSON(jsonData)) {
      return;
    }
    const startTime = performance.now();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/api/add-product",
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonData,
      });
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(response.data);
      setHistoryData((prevData) => [
        ...prevData,
        {
          url: "http://localhost:4000/api/add-product",
          response: response.status,
          time: `${response.statusText} - ${duration.toFixed(2)}ms`,
          message: "OK",
        },
      ]);
      setJsonData("");
    } catch (error) {
      console.error(error);
      const endTime = performance.now();
      const duration = endTime - startTime;

      setHistoryData((prevData) => [
        ...prevData,
        {
          url: "http://localhost:4000/api/add-product",
          response: error.response?.status || "Error",
          time: `${
            error.response?.statusText || "Unknown"
          } - ${duration.toFixed(2)}ms`,
          message: "Not OK",
        },
      ]);
    }
  };

  console.log(dropdownValueOption);
  console.log(isModalOpen);
  
  const performApiCall = async (method, url, data = null) => {
    const startTime = performance.now();

    try {
      const response = await axios({
        method,
        url,
        data,
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      setHistoryData((prevData) => [
        ...prevData,
        {
          url,
          response: response.status,
          time: `${response.statusText} - ${duration.toFixed(2)}ms`,
          message: "OK",
        },
      ]);
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      setHistoryData((prevData) => [
        ...prevData,
        {
          url,
          response: error.response?.status || "Error",
          time: `${
            error.response?.statusText || "Unknown"
          } - ${duration.toFixed(2)}ms`,
          message: "Not OK",
        },
      ]);
    }
  };

  const isValidJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  };
  const convertHistoryToText = (data) => {
    let text = "URL Name\tResponse\tTime\tMessage\n";

    for (const item of data) {
      text += `${item.url}\t${item.response}\t${item.time}\t${item.message}\n`;
    }

    return text;
  };
  const handleSaveHistoryAsTxt = () => {
    const text = convertHistoryToText(historyData);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "history_data.txt";
    a.click();

    URL.revokeObjectURL(url);
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
              onChange={handleChange}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              required
              className={classes.input}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button className={classes.send} onClick={handleSend}>
              Send
            </button>
          </div>
          <div className={classes.history}>
            <button
              className={classes.saveButton}
              onClick={handleSaveHistoryAsTxt}
            >
              Save History as Text
            </button>

            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes["table-head"]}>URL Name</th>
                  <th className={classes["table-head"]}>Response</th>
                  <th className={classes["table-head"]}>Time</th>
                  <th className={classes["table-head"]}>Message</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((data, index) => (
                  <tr key={index}>
                    <td className={classes["table-data"]}>{data.url}</td>
                    <td className={classes["table-data"]}>{data.response}</td>
                    <td className={classes["table-data"]}>{data.time}</td>
                    <td className={classes["table-data"]}>{data.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <span
              className={classes.close}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <textarea
              className={classes.jsonInput}
              placeholder='Enter JSON data like: {"name":"Nike", "price": 300, "category":"Shoes"}'
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
            />
            <button className={classes.sendJson} onClick={handleModalSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
