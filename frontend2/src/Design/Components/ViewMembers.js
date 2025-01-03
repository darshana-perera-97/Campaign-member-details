import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewMembers = () => {
  const [data, setData] = useState([]); // Data from the server
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  const [filters, setFilters] = useState({
    name: "",
    nic: "",
    dob: "",
    poolingBooth: "",
    gsDivision: "",
    agaDivision: "",
    priority: "",
  });
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    nic: true,
    mobile1: true,
    mobile2: true,
    homeNumber: true,
    whatsapp: true,
    address: true,
    dob: true,
    gsDivision: true,
    poolingBooth: true,
    priority: true,
  });
  const [modalData, setModalData] = useState(null); // Data for View More modal

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
          (entry.poolingBooth?.label || entry.poolingBooth || "")
            .toLowerCase()
            .includes(filters.poolingBooth.toLowerCase())) &&
        (!filters.gsDivision ||
          (entry.gsDivision?.label || entry.gsDivision || "")
            .toLowerCase()
            .includes(filters.gsDivision.toLowerCase())) &&
        (!filters.agaDivision ||
          (entry.agaDivision?.label || entry.agaDivision || "")
            .toLowerCase()
            .includes(filters.agaDivision.toLowerCase())) &&
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
      columns.map((col) => {
        if (col === "gsDivision" || col === "poolingBooth") {
          // Extract the label or fallback to a string value
          return entry[col]?.label || entry[col] || "-";
        }
        return entry[col] || "-";
      })
    );

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("filtered_data.pdf");
    setShowModal(false);
  };

  // Download Address PDF
  const handleDownloadAddressPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14); // Set text size to 14px
    const itemsPerPage = 18; // 3 rows x 7 columns
    const boxWidth = 65;
    const boxHeight = 35;
    const marginX = 0;
    const marginY = 1;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let x = marginX;
    let y = marginY;
    let count = 0;

    filteredData.forEach((entry, index) => {
      const name = entry.name || "-";
      const address = entry.address || "-";
      const content = `${name}\n${address}`;

      doc.rect(x, y, boxWidth, boxHeight, "S"); // Add 1px border
      doc.text(content, x + 2, y + 8);

      x += boxWidth; // Move to the next column
      count++;

      if (x + boxWidth > pageWidth) {
        x = marginX; // Reset to the first column
        y += boxHeight; // Move to the next row
      }

      if (y + boxHeight > pageHeight && index !== filteredData.length - 1) {
        doc.addPage(); // Add a new page
        x = marginX;
        y = marginY;
      }
    });

    doc.save("address_boxes.pdf");
  };

  // Show detailed data in a modal
  const handleViewMore = (entry) => {
    setModalData(entry);
  };

  return (
    <div className="container mt-4">
      <h2>Saved Form Data</h2>

      {/* Filter Inputs */}
      <div className="mb-3">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Filter by Name"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="nic"
              value={filters.nic}
              onChange={handleFilterChange}
              placeholder="Filter by NIC"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="dob"
              value={filters.dob}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="poolingBooth"
              value={filters.poolingBooth}
              onChange={handleFilterChange}
              placeholder="Filter by Pooling Booth"
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="gsDivision"
              value={filters.gsDivision}
              onChange={handleFilterChange}
              placeholder="Filter by GS Division"
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="agaDivision"
              value={filters.agaDivision}
              onChange={handleFilterChange}
              placeholder="Filter by AGA Division"
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-2">
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">Filter by Priority</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-md-3 mt-2">
            <button
              className="btn btn-danger"
              onClick={() =>
                setFilters({
                  name: "",
                  nic: "",
                  dob: "",
                  poolingBooth: "",
                  gsDivision: "",
                  agaDivision: "",
                  priority: "",
                })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {selectedColumns.name && <th>Name</th>}
            {selectedColumns.nic && <th>NIC</th>}
            {selectedColumns.gsDivision && <th>GS Division</th>}
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
                  <td>{entry.gsDivision?.label || entry.gsDivision || "-"}</td>
                )}
                {selectedColumns.priority && <td>{entry.priority}</td>}
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewMore(entry)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Download Buttons */}
      <div className="mt-3">
        <button
          className="btn btn-success me-2"
          onClick={() => setShowModal(true)}
        >
          Download as PDF
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleDownloadAddressPDF}
        >
          Download Address
        </button>
      </div>

      {/* Modal for PDF Column Selection */}
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

      {/* Modal for View More */}
      <Modal show={!!modalData} onHide={() => setModalData(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Entry Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData ? (
            <table className="table table-bordered">
              <tbody>
                {Object.entries(modalData).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>
                      {
                        typeof value === "object" && value?.label
                          ? value.label // Show the "label" if it's an object with a "label" property
                          : value.toString().replace(/\n/g, "<br />") // Handle line breaks
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalData(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewMembers;
