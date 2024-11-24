import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="App-main">
        {/* <nav className="navbar">
          <Link to="/">User Management</Link>
          <Link to="/roles">Role Management</Link>
        </nav> */}
          <Dashboard>
            <Routes>
              <Route path="/" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
            </Routes>
          </Dashboard>
        </main>
        {/* <footer className="App-footer">© 2024 Admin Panel. All rights reserved.</footer> */}
      </div>
    </Router>
  );
}

export default App;
