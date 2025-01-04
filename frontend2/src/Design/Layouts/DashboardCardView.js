import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import addMember from "../Assets/addMember.png";
import viewMembers from "../Assets/viewMembers.png";
import settings from "../Assets/settings.png";
import communities from "../Assets/communities.png";
import users from "../Assets/users.png";

const DashboardCardView = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        {/* <h2 className="text-primary">Data Collector</h2> */}
        <h1 className="text-center mb-5 card-heading">Data Collector</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-6 mb-4">
          <Link to="/add" className="text-decoration-none">
            <div className="card border-0 shadow text-center py-4">
              <div className="card-body">
                <img
                  src={addMember} // Replace with the path to your add members icon
                  alt="Add Members"
                  className="mb-3"
                  style={{ width: "100px" }}
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
                  src={viewMembers} // Replace with the path to your view members icon
                  alt="View Members"
                  className="mb-3"
                  style={{ width: "100px" }}
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
                  src={users} // Replace with the path to your manage users icon
                  alt="Manage Users"
                  className="mb-3"
                  style={{ width: "100px" }}
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
                  src={communities} // Replace with the path to your community icon
                  alt="Community"
                  className="mb-3"
                  style={{ width: "115px" }}
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
                  src={settings} // Replace with the path to your settings icon
                  alt="Settings"
                  className="mb-3"
                  style={{ width: "100px" }}
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
