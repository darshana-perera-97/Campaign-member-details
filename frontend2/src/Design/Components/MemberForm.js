import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MemberForm = () => {
  const [formData, setFormData] = useState({
    pollingBooth: "",
    gsDivision: "",
    agaDivision: "",
    priority: "5",
    teams: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Member added successfully!");
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h4 className="text-center mb-4">Add Member Details</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Polling Booth</label>
          <input
            type="text"
            className="form-control"
            name="pollingBooth"
            value={formData.pollingBooth}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GS Division</label>
          <input
            type="text"
            className="form-control"
            name="gsDivision"
            value={formData.gsDivision}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">AGA Division</label>
          <input
            type="text"
            className="form-control"
            name="agaDivision"
            value={formData.agaDivision}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Priority Level</label>
          <div className="d-flex align-items-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  value={level}
                  checked={formData.priority === `${level}`}
                  onChange={handleChange}
                />
                <label className="form-check-label">{level}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Add More Teams</label>
          <input
            type="text"
            className="form-control"
            name="teams"
            value={formData.teams}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
