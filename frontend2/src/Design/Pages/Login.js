import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./../baseURL";

export default function Login({ setIsAuthenticated, setRoll }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(`Frontend: User Role - ${data.role}`); // Log role in frontend console
        setRoll(data.role);
        setIsAuthenticated(true);
        localStorage.setItem("role", data.role); // Optionally store the role
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-md" style={{ width: "600px" }}>
        <h2 className="text-center mb-4 card-heading">System Login</h2>
        <form onSubmit={handleLogin} className="px-4">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
