import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logoWhite.png";

const TopBar = () => {
  const handleLogout = () => {
    // Refresh the page when the logout button is clicked
    window.location.reload();
  };

  return (
    <div className="top-bar d-flex justify-content-between align-items-center p-3">
      <Link to="/dashboard" className="text-decoration-none">
        <img
          src={logo} // Replace with the correct path to your PNG
          alt="Icon"
          className="top-bar-icon"
        />
      </Link>
      <button className="btn btn-primary2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default TopBar;
