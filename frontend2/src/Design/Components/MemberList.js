import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SavedDataTable = () => {
  const [data, setData] = useState([]); // Data from the server
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  const [filters, setFilters] = useState({
    name: "",
    nic: "",
    dob: "",
    poolingBooth: "",
    gsDivision: "",
    priority: "",
  });
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    nic: true,
    mobile1: true,
    gsDivision: true,
    poolingBooth: true,
    priority: true,
  });

  // Fetch saved data from the server
  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initially display all data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters to the data
  useEffect(() => {
    const filtered = data.filter((entry) => {
      return (
        (!filters.name ||
          entry.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.nic ||
          entry.nic.toLowerCase().includes(filters.nic.toLowerCase())) &&
        (!filters.dob || entry.dob === filters.dob) &&
        (!filters.poolingBooth ||
          entry.poolingBooth
            ?.toLowerCase()
            .includes(filters.poolingBooth.toLowerCase())) &&
        (!filters.gsDivision ||
          entry.gsDivision
            ?.toLowerCase()
            .includes(filters.gsDivision.toLowerCase())) &&
        (!filters.priority || entry.priority === filters.priority)
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  // Handle column selection in modal
  const handleColumnChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColumns({ ...selectedColumns, [name]: checked });
  };

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const columns = Object.keys(selectedColumns).filter(
      (key) => selectedColumns[key]
    );

    const rows = filteredData.map((entry) =>
      columns.map((col) => entry[col] || "-")
    );

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("filtered_data.pdf");
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Member List</h2>

      {/* Filter Inputs */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="nic"
              value={filters.nic}
              onChange={handleFilterChange}
              placeholder="NIC Number"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <select
              name="gsDivision"
              value={filters.gsDivision}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">-- Select GS Division --</option>
              <option value="Division A">Division A</option>
              <option value="Division B">Division B</option>
              <option value="Division C">Division C</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="poolingBooth"
              value={filters.poolingBooth}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">-- Select Pooling Booth --</option>
              <option value="Booth 1">Booth 1</option>
              <option value="Booth 2">Booth 2</option>
              <option value="Booth 3">Booth 3</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">-- Select Priority --</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {selectedColumns.name && <th>Name</th>}
            {selectedColumns.nic && <th>NIC Number</th>}
            {selectedColumns.gsDivision && <th>GS Division</th>}
            {selectedColumns.poolingBooth && <th>Pooling Booth</th>}
            {selectedColumns.priority && <th>Priority</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <tr key={index}>
                {selectedColumns.name && <td>{entry.name}</td>}
                {selectedColumns.nic && <td>{entry.nic}</td>}
                {selectedColumns.gsDivision && (
                  <td>{entry.gsDivision || "-"}</td>
                )}
                {selectedColumns.poolingBooth && (
                  <td>{entry.poolingBooth || "-"}</td>
                )}
                {selectedColumns.priority && <td>{entry.priority}</td>}
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => alert(JSON.stringify(entry, null, 2))}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Download PDF Button */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setShowModal(true)}
        >
          Download as PDF
        </button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Columns for PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(selectedColumns).map((col) => (
            <div className="form-check" key={col}>
              <input
                type="checkbox"
                name={col}
                id={col}
                checked={selectedColumns[col]}
                onChange={handleColumnChange}
                className="form-check-input"
              />
              <label htmlFor={col} className="form-check-label">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SavedDataTable;
