import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import AddMan from "./Pages/AddMan";
import ViewAll from "./Pages/ViewAll";
import Users from "./Pages/Users";

export default function Design() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMan />} />
        <Route path="/viewAll" element={<ViewAll />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}
