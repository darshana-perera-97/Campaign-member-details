import React from "react";

const MemberList = () => {
  return (
    <div className="container-fluid bg-light vh-100">
      <div className="container py-4">
        {/* Header */}
        <header className="d-flex align-items-center bg-primary text-white p-3">
          <img
            src="path-to-logo.png"
            alt="Data Collector Logo"
            className="me-2"
            style={{ height: "30px" }}
          />
          <h5 className="mb-0">Data Collector</h5>
        </header>

        {/* Member List Section */}
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h3 className="text-center mb-4">Member List</h3>
          <div className="row g-2 mb-4">
            {/* Filter Inputs */}
            {[
              "Name",
              "NIC Number",
              "GS Division",
              "Polling Booth",
              "Priority",
              "Community",
            ].map((placeholder) => (
              <div className="col-md-2" key={placeholder}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          {/* Table */}
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>NIC Number</th>
                <th>Mobile Number</th>
                <th>GS Division</th>
                <th>Priority Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Darshana Perera</td>
                <td>972060909V</td>
                <td>0771461925</td>
                <td>Ihala Kudawewa</td>
                <td>5</td>
                <td>
                  <button className="btn btn-link text-primary p-0 me-2">
                    View Details
                  </button>
                  <button className="btn btn-link text-primary p-0">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Download Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-primary">Download as PDF</button>
            <button className="btn btn-primary">Download Address List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
