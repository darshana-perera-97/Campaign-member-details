import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SettingsPage = () => {
  const [startTime, setStartTime] = useState("08:00"); // Default start time
  const [endTime, setEndTime] = useState("17:00");   // Default end time

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    window.alert(`Settings saved!\nStart Time: ${startTime}\nEnd Time: ${endTime}`);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "50%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="card-header text-white text-center"
          style={{
            backgroundColor: "#007bff",
            padding: "15px 0",
          }}
        >
          <h5 className="m-0">Settings</h5>
        </div>

        {/* Form Body */}
        <div className="card-body p-5">
          <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Configure Timings
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Time Pickers */}
            <div className="mb-4">
              <h5 style={{ fontWeight: "bold", color: "#333" }}>Timing Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="startTime" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                }}
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
