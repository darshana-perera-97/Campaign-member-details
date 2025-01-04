import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/update-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          alert("Password updated successfully!");
          setFormValues({ username: "", oldPassword: "", newPassword: "" });
          setIsModalOpen(false);
        } else {
          response.json().then((data) => alert(data.message));
        }
      })
      .catch((error) => console.error("Error updating password:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User List</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setFormValues({ ...formValues, username: user.username });
                    setIsModalOpen(true);
                  }}
                >
                  Update Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handlePasswordUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.username}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formValues.oldPassword}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          oldPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formValues.newPassword}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setIsModalOpen(false)}
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

export default UserList;
