import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">About</Link>
        </li>
        <li>
          <Link to="/viewAll">Services</Link>
        </li>
        <li>
          <Link to="/add">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
