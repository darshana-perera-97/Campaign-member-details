import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { poolingOptions, gsOptions, agaOptions, region } from "./data";
import API_BASE_URL from "./../baseURL";

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
    fetch(`${API_BASE_URL}/communities`)
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
          RegID: "",
          politicalPartyId: "",
          name: "",
          nic: "",
          mobile1: "",
          mobile2: "",
          homeNumber: "",
          whatsapp: "",
          address: "",
          dob: "",
          region: null,
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
      className="container mt-5 p-5 rounded"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "700px",
      }}
    >
      <h2 className="text-center mb-4 mt-3 card-heading">
        User Information Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label custom-font">iïmQ¾K ku</label>
          <input
            type="text"
            className="form-control custom-font"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ku"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">cd' ye' wxlh</label>
          <input
            type="text"
            className="form-control"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="NIC"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">cx.u ÿrl;k wxl 01</label>
          <input
            type="tel"
            className="form-control custom-font"
            name="mobile1"
            value={formData.mobile1}
            onChange={handleChange}
            placeholder="ÿrl;k wxl 01 we;=,;a lrkak"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">jÜia-wema wxlh</label>
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
          <label className="form-label custom-font">
            cx.u ÿrl;k wxl 02 ^úl,am&
          </label>
          <input
            type="tel"
            className="form-control custom-font"
            name="mobile2"
            value={formData.mobile2}
            onChange={handleChange}
            placeholder="ÿrl;k wxl 02 we;=,;a lrkak"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">
            ia:djr ÿrl;k wxl ^úl,am&
          </label>
          <input
            type="tel"
            className="form-control custom-font"
            name="homeNumber"
            value={formData.homeNumber}
            onChange={handleChange}
            placeholder="ia:djr ÿrl;k wxlh we;=,;a lrkak"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">,smskh</label>
          <textarea
            className="form-control custom-font"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder=",smskh"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">Wmka Èkh</label>
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
          <label className="form-label custom-font">mlaI idudðl wxlh</label>
          <input
            type="text"
            required
            className="form-control"
            name="politicalPartyId"
            value={formData.politicalPartyId}
            onChange={handleChange}
            placeholder="Unique ID"
            pattern="\d{6}"
            title="Membership number must be 6 digits"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">wdikh</label>
          <Select
            options={region}
            required
            onChange={(option) => handleSelectChange("region", option)}
            isSearchable
            className="custom-font"
            placeholder="wdikh f;darkak"
          />
        </div>
        <div className="mb-3">
          <label className="form-label custom-font">fmd,sx nQ;a</label>
          <Select
            options={poolingOptions}
            required
            className="custom-font"
            onChange={(option) => handleSelectChange("poolingBooth", option)}
            isSearchable
            placeholder="fmd,sx nQ;a wxlh f;darkak"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">.%dufiajd jiu</label>
          <Select
            options={gsOptions}
            required
            onChange={(option) => handleSelectChange("gsDivision", option)}
            isSearchable
            className="custom-font"
            placeholder=".%dufiajd jiu f;darkak"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">
            m%dfoaYSh f,alï ld¾hd,h
          </label>
          <Select
            options={agaOptions}
            required
            onChange={(option) => handleSelectChange("agaDivision", option)}
            className="custom-font"
            isSearchable
            placeholder="m%dfoaYSh f,alï ld¾hd,h f;darkak"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">m%uqL;dj</label>
          <select
            className="form-select"
            required
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
          <label className="form-label custom-font">idudðl;ajhka</label>
          <Select
            options={communityOptions}
            onChange={handleMultiSelectChange}
            isMulti
            placeholder="f;darkak"
            className="custom-font"
          />
        </div>

        <div className="mb-3">
          <label className="form-label custom-font">fjk;a úia;r</label>
          <input
            type="text"
            className="form-control custom-font"
            name="connectivity"
            value={formData.connectivity}
            onChange={handleChange}
            placeholder="iduðlhdf.a fjk;a úia;r"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3 custom-btn "
          style={{ padding: "0.75rem" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
