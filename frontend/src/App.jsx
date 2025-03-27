import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SplashPage from "./Pages/SplashPage";
import Login from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
