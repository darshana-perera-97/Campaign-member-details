import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    mobile1: "",
    mobile2: "",
    homeNumber: "",
    whatsapp: "",
    address: "",
    dob: "",
    poolingBooth: null,
    gsDivision: null,
    agaDivision: null,
    priority: 5,
    connectivity: "",
  });

  const poolingOptions = [
    { value: "booth1", label: "Booth 1" },
    { value: "booth2", label: "Booth 2" },
    { value: "booth3", label: "Booth 3" },
  ];

  const gsOptions = [
    { value: "gs1", label: "GS Division 1" },
    { value: "gs2", label: "GS Division 2" },
    { value: "gs3", label: "GS Division 3" },
  ];

  const agaOptions = [
    { value: "aga1", label: "AGA Division 1" },
    { value: "aga2", label: "AGA Division 2" },
    { value: "aga3", label: "AGA Division 3" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData({ ...formData, [field]: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">User Information Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">NIC Number</label>
          <input
            type="text"
            className="form-control"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number 1</label>
          <input
            type="tel"
            className="form-control"
            name="mobile1"
            value={formData.mobile1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number 2 (Optional)</label>
          <input
            type="tel"
            className="form-control"
            name="mobile2"
            value={formData.mobile2}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Home Number (Optional)</label>
          <input
            type="tel"
            className="form-control"
            name="homeNumber"
            value={formData.homeNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">WhatsApp Number</label>
          <input
            type="tel"
            className="form-control"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pooling Booth</label>
          <Select
            options={poolingOptions}
            onChange={(option) => handleSelectChange("poolingBooth", option)}
            isSearchable
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GS Division</label>
          <Select
            options={gsOptions}
            onChange={(option) => handleSelectChange("gsDivision", option)}
            isSearchable
          />
        </div>

        <div className="mb-3">
          <label className="form-label">AGA Division</label>
          <Select
            options={agaOptions}
            onChange={(option) => handleSelectChange("agaDivision", option)}
            isSearchable
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Priority Level</label>
          <select
            className="form-select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Connectivity</label>
          <input
            type="text"
            className="form-control"
            name="connectivity"
            value={formData.connectivity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
