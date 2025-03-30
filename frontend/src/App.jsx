import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SplashPage from "./Pages/SplashPage";
import Login from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import SmartShopping from "./Pages/SmartShopping.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/smartshopping" element={<SmartShopping />} />
      </Routes>
    </Router>
  );
}
