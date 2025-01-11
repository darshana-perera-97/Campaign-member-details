import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logoWhite.png";

const TopBar = () => {
  return (
    <div className="top-bar ">
      <Link to="/dashboard" className="text-decoration-none my-4">
        <img
          src={logo} // Replace with the correct path to your PNG
          alt="Icon"
          className="top-bar-icon"
        />
        {/* add dropdown here */}
      </Link>
    </div>
  );
};

export default TopBar;
