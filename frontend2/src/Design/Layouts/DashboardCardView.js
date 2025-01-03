import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardCardView = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">Data Collector</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-6 mb-4">
          <Link to="/add" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src="/path-to-add-icon" // Replace with the path to your add members icon
                  alt="Add Members"
                  className="mb-3"
                  style={{ width: "50px" }}
                />
                <h5 className="card-title">Add Members</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <Link to="/viewAll" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src="/path-to-view-icon" // Replace with the path to your view members icon
                  alt="View Members"
                  className="mb-3"
                  style={{ width: "50px" }}
                />
                <h5 className="card-title">View Members</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <Link to="/users" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src="/path-to-manage-icon" // Replace with the path to your manage users icon
                  alt="Manage Users"
                  className="mb-3"
                  style={{ width: "50px" }}
                />
                <h5 className="card-title">Manage Users</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <Link to="/community" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src="/path-to-community-icon" // Replace with the path to your community icon
                  alt="Community"
                  className="mb-3"
                  style={{ width: "50px" }}
                />
                <h5 className="card-title">Community</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <Link to="/settings" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src="/path-to-settings-icon" // Replace with the path to your settings icon
                  alt="Settings"
                  className="mb-3"
                  style={{ width: "50px" }}
                />
                <h5 className="card-title">Settings</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardView;
