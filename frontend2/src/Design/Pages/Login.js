import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SampleButton from "../Components/SampleButton";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication logic (replace with real logic)
    if (username === "a" && password === "a") {
      setIsAuthenticated(true); // Update authentication state
      navigate("/"); // Redirect to the home page
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {/* <SampleButton /> */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
