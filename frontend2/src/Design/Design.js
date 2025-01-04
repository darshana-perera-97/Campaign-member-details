import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AddMan from "./Pages/AddMan";
import ViewAll from "./Pages/ViewAll";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";
import Settings from "./Pages/Settings";

export default function Design() {
  // State to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roll, setRoll] = useState("not-set");

  // Function to check access permissions
  const hasAccess = (requiredRoles) => requiredRoles.includes(roll);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          <Login setIsAuthenticated={setIsAuthenticated} setRoll={setRoll} />
        }
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <>
          {/* Admin: Full access */}
          {hasAccess(["Admin"]) && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}

          {/* Viewer: Limited access */}
          {hasAccess(["Viewer", "Office", "Admin"]) && (
            <>
              <Route path="/viewAll" element={<ViewAll />} />
              <Route path="/dashboard" element={<Dashboard roll={roll} />} />
            </>
          )}

          {/* Office: Additional access */}
          {hasAccess(["Office", "Admin"]) && (
            <Route path="/add" element={<AddMan />} />
          )}

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
