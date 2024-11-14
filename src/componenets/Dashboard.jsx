import React from "react";

import ComponentProtected from "./ComponentProtected";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <ComponentProtected />
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;
