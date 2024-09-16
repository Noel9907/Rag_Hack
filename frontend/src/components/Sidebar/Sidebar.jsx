import React, { useState } from "react";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [symbol, setSymbol] = useState("");
  const [days, setDays] = useState("");

  const [fetchedData, setFetchedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Symptom: ${symbol}, Days observed: ${days}`);

    const formData = {
      symptom: symbol,
      days: days,
    };

    try {
      await axios.post("http://localhost:5000/symptom/input", formData);

      const getResponse = await axios.get(
        "http://localhost:5000/symptom/diseases",
        {
          params: {
            symptom: symbol,
          },
        }
      );
      console.log("GET response:", getResponse.data);

      setFetchedData(getResponse.data);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <div className="total">
      <div className="top">
        <h1>SYMPTOM CHECKER</h1>
      </div>

      <div className="symbol-collection">
        <img
          src="src/assets/symptom-checkers.jpg"
          alt="Symptom Checker"
          className="sidebar-image"
        />
        <h2>Enter Your Symptom</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter your symptoms here"
            required
          />

          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Number of days"
            required
          />

          <button type="submit">Submit</button>
        </form>

        <div className="fetched-data">
          <h3>Fetched Data:</h3>
          <ul>
            {fetchedData &&
              Object.keys(fetchedData).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong> {fetchedData[key]} ,
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
