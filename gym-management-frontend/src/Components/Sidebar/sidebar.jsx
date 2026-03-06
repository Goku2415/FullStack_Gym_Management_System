import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  const [gymName, setGymName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const greetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  };

  useEffect(() => {
    greetingMessage();
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("gymName") || "Alpha_Core_Gym";
    setGymName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-[280px] min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6 shadow-2xl">


      <div className="text-center py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide">
          {gymName}
        </h1>
      </div>


      {/* Admin Profile */}

      <div className="flex items-center gap-4 px-6 py-6 border-b border-gray-700">

        <img
          src="./me.jpg"
          alt="Admin"
          className="w-16 h-16 rounded-full border-2 border-gray-500"
        />

        <div>
          <p className="text-lg font-semibold">{greeting}</p>
          <p className="text-gray-400 text-sm">Admin</p>
        </div>

      </div>


      {/* Navigation */}

      <div className="flex flex-col gap-4 mt-6 px-4">

        {/* Dashboard */}

        <Link
          to="/dashboard"
          className={`flex items-center gap-4 p-3 rounded-lg transition duration-200
          ${
            location.pathname === "/dashboard"
              ? "bg-gradient-to-r from-sky-400 to-fuchsia-400 text-black font-semibold"
              : "hover:bg-gray-800"
          }`}
        >
          <HomeIcon />
          Dashboard
        </Link>


        {/* Members */}

        <Link
          to="/member"
          className={`flex items-center gap-4 p-3 rounded-lg transition duration-200
          ${
            location.pathname === "/member"
              ? "bg-gradient-to-r from-sky-400 to-fuchsia-400 text-black font-semibold"
              : "hover:bg-gray-800"
          }`}
        >
          <GroupIcon />
          Members
        </Link>


        {/* Logout */}

        <div
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-red-500 transition duration-200 mt-6"
        >
          <LogoutIcon />
          Logout
        </div>

      </div>

    </div>
  );
};

export default Sidebar;