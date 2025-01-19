import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import API_BASE_URL from "./../baseURL";

const ViewMembers = () => {
  const [data, setData] = useState([]); // Data from the server
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const rowsPerPage = 8; // Maximum rows per page

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
    region: true,
  });
  const [modalData, setModalData] = useState(null); // Data for View More modal

  // Fetch saved data from the server
  useEffect(() => {
    fetch(`${API_BASE_URL}/data`)
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

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle column selection in modal
  const handleColumnChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColumns({ ...selectedColumns, [name]: checked });
  };

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS(
      "../fonts/FM-Malithi.ttf",
      "---"
    );
    doc.addFont("../fonts/FM-Malithi.ttf", "CustomFont", "normal");

    // Set the custom font for the entire document
    doc.setFont("CustomFont");

    // Add some text to demonstrate the custom font
    doc.text(20, 20, "This is a sample text with the custom font.");

    // Get selected columns
    const columns = Object.keys(selectedColumns).filter(
      (key) => selectedColumns[key]
    );

    // Map filtered data to rows
    const rows = filteredData.map((entry) =>
      columns.map((col) => {
        if (col === "gsDivision" || col === "poolingBooth") {
          return entry[col]?.label || entry[col] || "-";
        }
        return entry[col] || "-";
      })
    );

    // Set up autoTable with custom styles
    doc.autoTable({
      head: [columns],
      body: rows,
      styles: {
        cellPadding: 2,
        overflow: "linebreak",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        font: "CustomFont", // Ensure custom font is used in autoTable
      },
      didDrawCell: (data) => {
        // Custom logic for drawing cells can go here if needed
        // For example, you can still check specific conditions if necessary
      },
    });

    // Save the generated PDF
    doc.save("filtered_data.pdf");

    // Close modal if applicable
    setShowModal(false);
  };

  // Download Address PDF
  const handleDownloadAddressPDF = () => {
    const doc = new jsPDF();

    // Add custom font (replace with your base64 encoded font)
    doc.addFileToVFS("../fonts/FM-Malithi.ttf", "---");
    doc.addFont("../fonts/FM-Malithi.ttf", "CustomFont", "normal");

    doc.setFont("CustomFont"); // Set the custom font
    doc.setFontSize(14); // Set text size to 14px
    const itemsPerPage = 18; // 3 rows x 7 columns
    const boxWidth = 105;
    const boxHeight = 35;
    const marginX = 0;
    const marginY = 1;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let x = marginX;
    let y = marginY;

    filteredData.forEach((entry, index) => {
      const name = entry.name || "-";
      const address = entry.address || "-";
      const content = `${name}\n${address}`;

      doc.rect(x, y, boxWidth, boxHeight, "S"); // Add 1px border
      doc.text(content, x + 2, y + 8);

      x += boxWidth; // Move to the next column

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
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <h2 className="text-center mb-5 mt-3 card-heading">Saved Form Data</h2>

      {/* Filter Inputs */}
      <div className="mb-5">
        <div className="row">
          {" "}
          <h5 className=" mt-3 card-heading">Filter Data</h5>
        </div>
        <div className="row">
          {/* <div className="col-md-3 mt-2">
            <input
              type="text"
              name="politicalPartyId"
              value={filters.politicalPartyId}
              onChange={handleFilterChange}
              placeholder="Req Id"
              className="form-control"
            />
          </div> */}
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="ku"
              className="form-control custom-font"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="nic"
              value={filters.nic}
              onChange={handleFilterChange}
              placeholder="NIC"
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              placeholder="DOB"
              type="date"
              name="dob"
              value={filters.dob}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="poolingBooth"
              value={filters.poolingBooth}
              onChange={handleFilterChange}
              placeholder="fmda,sx nQ;a"
              className="form-control custom-font"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="gsDivision"
              value={filters.gsDivision}
              onChange={handleFilterChange}
              placeholder=".%dufiajd jiu"
              className="form-control custom-font"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="agaDivision"
              value={filters.agaDivision}
              onChange={handleFilterChange}
              placeholder="m%dfoaYSh f,alï fldÜgdih"
              className="form-control custom-font"
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              name="agaDivision"
              value={filters.agaDivision}
              onChange={handleFilterChange}
              placeholder="Political Party Number"
              className="form-control "
            />
          </div>
          <div className="col-md-3 mt-2">
            <select
              name="m%uqL;dj"
              value={filters.priority}
              onChange={handleFilterChange}
              className="form-control custom-font"
            >
              <option value="" className="custom-font">
                m%uqL;dj
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-md-3 mt-2">
            <button
              className="btn btn-primary btn-sm mt-1 "
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
      <table className="table table-bordered table-striped table-hover">
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
          {paginatedData.length > 0 ? (
            paginatedData.map((entry, index) => (
              <tr key={index}>
                {selectedColumns.name && (
                  <td className="custom-font">{entry.name}</td>
                )}
                {selectedColumns.nic && <td>{entry.nic}</td>}
                {selectedColumns.gsDivision && (
                  <td className="custom-font">
                    {entry.gsDivision?.label || entry.gsDivision || "-"}
                  </td>
                )}
                {selectedColumns.priority && <td>{entry.priority}</td>}
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setModalData(entry)}
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

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

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
                    <td
                      className={
                        key === "communities" ||
                        key === "poolingBooth" ||
                        key === "agaDivision" ||
                        key === "region" ||
                        key === "gsDivision" ||
                        key === "address" ||
                        key === "name"
                          ? "custom-font"
                          : ""
                      }
                    >
                      {
                        Array.isArray(value)
                          ? // Handle arrays, displaying the "label" property if available
                            value.map((item, idx) =>
                              typeof item === "object" && item?.label ? (
                                <div key={idx}>{item.label}</div>
                              ) : (
                                <div key={idx}>{item.toString()}</div>
                              )
                            )
                          : typeof value === "object" && value?.label
                          ? value.label // Show the "label" if it's an object with a "label" property
                          : value // Handle line breaks
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
