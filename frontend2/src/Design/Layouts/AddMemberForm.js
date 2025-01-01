import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddMemberForm = () => {
  const [selectedPriority, setSelectedPriority] = useState(5); // Default priority is 5

  const handlePriorityClick = (level) => {
    setSelectedPriority(level);
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
          <h5 className="m-0">Data Collector</h5>
        </div>

        {/* Form Body */}
        <div className="card-body p-5">
          <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Add Member Details
          </h4>

          <form>
            {/* Division Details */}
            <div className="mb-4">
              <h5 style={{ fontWeight: "bold", color: "#333" }}>
                Division Details
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="pollingBooth" className="form-label">
                    Polling Booth
                  </label>
                  <input
                    type="text"
                    id="pollingBooth"
                    className="form-control"
                    placeholder="Enter Polling Booth"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gsDivision" className="form-label">
                    GS Division
                  </label>
                  <input
                    type="text"
                    id="gsDivision"
                    className="form-control"
                    placeholder="Enter GS Division"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="agaDivision" className="form-label">
                    AGA Division
                  </label>
                  <input
                    type="text"
                    id="agaDivision"
                    className="form-control"
                    placeholder="Enter AGA Division"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Priority Level</label>
                  <div className="d-flex align-items-center gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`btn ${
                          selectedPriority === level
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        style={{ borderRadius: "50%" }}
                        onClick={() => handlePriorityClick(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Communities */}
            <div className="mb-4">
              <h5 style={{ fontWeight: "bold", color: "#333" }}>Communities</h5>
              <div className="mb-3">
                <label htmlFor="teamName" className="form-label">
                  01. Team name 01
                </label>
                <input
                  type="text"
                  id="teamName"
                  className="form-control"
                  placeholder="Enter Team Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addMoreTeams" className="form-label">
                  Add More Teams
                </label>
                <input
                  type="text"
                  id="addMoreTeams"
                  className="form-control"
                  placeholder="Enter More Teams"
                />
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
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;
