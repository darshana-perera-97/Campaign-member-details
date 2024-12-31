import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SavedDataTable = () => {
  const [data, setData] = useState([]); // Data from the server
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  const [showModal, setShowModal] = useState(false); // Modal state
  const [filters, setFilters] = useState({
    name: "",
    nic: "",
    dob: "",
    poolingBooth: "",
    gsDivision: "",
    agaDivision: "",
    priority: "",
  });
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    nic: true,
    gsDivision: true,
    priority: true,
  }); // Track selected columns

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
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>GS Division</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.nic}</td>
                <td>{entry.gsDivision?.label || entry.gsDivision || "-"}</td>
                <td>{entry.priority}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => alert(JSON.stringify(entry, null, 2))}
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
    </div>
  );
};

export default SavedDataTable;
