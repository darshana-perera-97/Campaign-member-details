import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { poolingOptions, gsOptions, agaOptions } from "./data";

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
    communities: [], // New state for Communities
    priority: 5,
    connectivity: "",
  });

  const [communityOptions, setCommunityOptions] = useState([]);

  // Fetch community options
  React.useEffect(() => {
    fetch("http://localhost:5000/communities")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((community) => ({
          value: community.name,
          label: community.name,
        }));
        setCommunityOptions(options);
      })
      .catch((error) => console.error("Error fetching communities:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData({ ...formData, [field]: selectedOption });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData({ ...formData, communities: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            throw new Error("NIC already exists. Please use a unique NIC.");
          }
          throw new Error("Failed to submit form. Please try again.");
        }
        return response.json();
      })
      .then(() => {
        alert("Form submitted successfully!");
        setFormData({
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
          communities: [],
          priority: 5,
          connectivity: "",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div
      className="container mt-5 p-4 rounded"
      style={{
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "700px",
      }}
    >
      <h3 className="text-center text-primary mb-4">User Information Form2</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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
            placeholder="National Identity Card number"
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
            placeholder="Primary mobile number"
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
            placeholder="Secondary mobile number"
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
            placeholder="Home phone number"
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
            placeholder="WhatsApp contact number"
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
            placeholder="Enter your full address"
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
            placeholder="Select your pooling booth"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GS Division</label>
          <Select
            options={gsOptions}
            onChange={(option) => handleSelectChange("gsDivision", option)}
            isSearchable
            placeholder="Select your GS Division"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">AGA Division</label>
          <Select
            options={agaOptions}
            onChange={(option) => handleSelectChange("agaDivision", option)}
            isSearchable
            placeholder="Select your AGA Division"
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
          <label className="form-label">Communities</label>
          <Select
            options={communityOptions}
            onChange={handleMultiSelectChange}
            isMulti
            placeholder="Select Communities"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Connectivity</label>
          <input
            type="text"
            className="form-control"
            name="connectivity"
            value={formData.connectivity}
            onChange={handleChange}
            placeholder="Enter your connectivity details"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          style={{ padding: "0.75rem" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
