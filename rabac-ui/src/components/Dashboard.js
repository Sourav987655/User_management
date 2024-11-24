import React from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css"; // Add styling

function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          User Management
        </NavLink>
        <NavLink
          to="/roles"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Role Management
        </NavLink>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Dashboard;
