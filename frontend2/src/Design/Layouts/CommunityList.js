import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { gsOptions, agaOptions } from "../Components/data";
import API_BASE_URL from "./../baseURL";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    gsDivision: "",
    agaDivision: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch communities
  useEffect(() => {
    fetch(`${API_BASE_URL}/communities`)
      .then((response) => response.json())
      .then((data) => setCommunities(data))
      .catch((error) => console.error("Error fetching communities:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/communities/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCommunities(communities.filter((_, index) => index !== id));
        } else {
          console.error("Failed to delete community");
        }
      })
      .catch((error) => console.error("Error deleting community:", error));
  };

  const handleEdit = (id) => {
    const community = communities[id];
    setFormValues(community);
    setEditIndex(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate community name
    const isDuplicate = communities.some(
      (community, index) =>
        community.name.toLowerCase() === formValues.name.toLowerCase() &&
        index !== editIndex
    );

    if (isDuplicate) {
      alert(
        "A community with this name already exists. Please choose another name."
      );
      return;
    }

    const url =
      editIndex !== null
        ? `${API_BASE_URL}/communities/${editIndex}`
        : `${API_BASE_URL}/communities`;
    const method = editIndex !== null ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          if (method === "POST") {
            setCommunities([...communities, formValues]);
          } else {
            const updatedCommunities = [...communities];
            updatedCommunities[editIndex] = formValues;
            setCommunities(updatedCommunities);
          }
          setFormValues({ name: "", gsDivision: "", agaDivision: "" });
          setEditIndex(null);
          setIsModalOpen(false);
        } else {
          console.error("Failed to save community");
        }
      })
      .catch((error) => console.error("Error saving community:", error));
  };

  return (
    <div
      className="container mt-4 "
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <h2 className="text-center mb-4 mt-3 card-heading">Community List</h2>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th className="custom-font">iñ;sfha ku</th>
            <th className="custom-font">.%dufiajd fldÜgdih</th>
            <th className="custom-font">m%dfoaYSh f,alï fldÜgdih</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community, index) => (
            <tr key={index}>
              <td className="custom-font">{community.name}</td>
              <td className="custom-font">{community.gsDivision}</td>
              <td className="custom-font">{community.agaDivision}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary px-4 mt-3 custom-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Community
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex !== null ? "Edit Community" : "Add New Community"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditIndex(null);
                    setFormValues({
                      name: "",
                      gsDivision: "",
                      agaDivision: "",
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">iñ;sfha ku</label>
                    <input
                      type="text"
                      className="form-control custom-font"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label custom-font">
                      .%dufiajd fldÜgdih
                    </label>
                    <select
                      className="form-select custom-font"
                      value={formValues.gsDivision}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          gsDivision: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="" disabled>
                        .%dufiajd fldÜgdih f;darkak
                      </option>
                      {gsOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label custom-font">
                      m%dfoaYSh f,alï fldÜgdih
                    </label>
                    <select
                      className="form-select custom-font"
                      value={formValues.agaDivision}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          agaDivision: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="" disabled>
                        m%dfoaYSh f,alï fldÜgdih f;darkak
                      </option>
                      {agaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditIndex(null);
                      setFormValues({
                        name: "",
                        gsDivision: "",
                        agaDivision: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityList;
