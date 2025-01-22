import React, { useState, useEffect } from "react";
import API_BASE_URL from "./../baseURL";

const BirthdayChecker = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-time-data`);
        const data = await response.json();
        setTime(`${data.HH}:${data.MM}`); // Format the time properly
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchTime();
  }, []);

  return (
    <div>
      <h2>Birthday Checker</h2>
      <p>Current Time (HH-MM): {time || "Loading..."}</p>
    </div>
  );
};

export default BirthdayChecker;
