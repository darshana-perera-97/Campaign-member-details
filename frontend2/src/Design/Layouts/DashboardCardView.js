import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import addMember from "../Assets/addMember.png";
import viewMembers from "../Assets/viewMembers.png";
import settings from "../Assets/settings.png";
import communities from "../Assets/communities.png";
import users from "../Assets/users.png";

const DashboardCardView = (prop) => {
  // Define the card data and the roles that can access each card

  // Get current Sri Lankan time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Colombo",
  });
  const currentHour = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    hour: "numeric",
    hour12: false,
  });

  // Determine the greeting based on the hour
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const cards = [
    {
      path: "/add",
      imgSrc: addMember,
      imgAlt: "Add Members",
      title: "Add Members",
      roles: ["Admin", "Office"],
    },
    {
      path: "/viewAll",
      imgSrc: viewMembers,
      imgAlt: "View Members",
      title: "View Members",
      roles: ["Admin", "Viewer", "Office"],
    },
    {
      path: "/users",
      imgSrc: users,
      imgAlt: "Manage Users",
      title: "Manage Users",
      roles: ["Admin"],
    },
    {
      path: "/settings",
      imgSrc: settings,
      imgAlt: "Settings",
      title: "Settings",
      roles: ["Admin"],
    },
    {
      path: "/community",
      imgSrc: communities,
      imgAlt: "Community",
      title: "Community",
      roles: ["Admin"],
    },
    {
      path: "/campaigns",
      imgSrc: communities,
      imgAlt: "Campaigns",
      title: "Campaigns",
      roles: ["Admin", "Office"],
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h4 className="text-center card-heading">Hi, {getGreeting()}</h4>
        <h1 className="text-center mb-5 card-heading">
          Data Collector - {prop.roll}
        </h1>
      </div>
      <div className="row justify-content-center">
        {cards
          .filter((card) => card.roles.includes(prop.roll)) // Filter cards based on user role
          .map((card, index) => (
            <div className="col-md-3 col-6 mb-4" key={index}>
              <Link to={card.path} className="text-decoration-none">
                <div className="card border-0 shadow text-center py-4">
                  <div className="card-body">
                    <img
                      src={card.imgSrc}
                      alt={card.imgAlt}
                      className="mb-3"
                      style={{ width: "100px" }}
                    />
                    <h5 className="card-title">{card.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardCardView;
