import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AddMan from "./Pages/AddMan";
import ViewAll from "./Pages/ViewAll";
import Users from "./Pages/Users";
import Login from "./Pages/Login";

export default function Design() {
  // State to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMan />} />
          <Route path="/viewAll" element={<ViewAll />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" replace />} />{" "}
          {/* Redirect unknown paths to home */}
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
