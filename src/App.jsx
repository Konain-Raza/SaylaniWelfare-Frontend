import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/admin/Login"; // Adjust path as necessary
import Dashboard from "./pages/Dashboard"; // Adjust path as necessary

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check authentication

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 Not Found route */}
        <Route path="*" element={<div>NOt FOund</div>} />
      </Routes>
    </Router>
  );
};

export default App;
