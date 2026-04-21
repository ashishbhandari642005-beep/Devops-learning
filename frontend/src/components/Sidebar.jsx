import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/devices">Devices</Link>
      <Link to="/alerts">Alerts</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default Sidebar;