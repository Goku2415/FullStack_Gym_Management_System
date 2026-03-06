import "./App.css";
import Sidebar from "./Components/Sidebar/sidebar";
import Dashboard from "./Pages/Dashboard/dashboard";
import Home from "./Pages/Home/home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Member from "./Pages/Member/member";
import GeneralUser from "./Pages/GeneralUser/generalUser";
import MembersDetails from "./Pages/memberDetail/memberDetail";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {isLoggedIn && location.pathname !== "/" && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
          />

          <Route
            path="/member"
            element={isLoggedIn ? <Member /> : <Navigate to="/" replace />}
          />

          <Route
            path="/specific/:page"
            element={isLoggedIn ? <GeneralUser /> : <Navigate to="/" replace />}
          />

          <Route
            path="/member/:id"
            element={
              isLoggedIn ? <MembersDetails /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
