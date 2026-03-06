import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Dashboard Token:", token);

    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //e = the mouse click event object.This function checks where the user clicked.
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        //accordianDashboard is true ✔ . This is the DOM element of your accordion container.✔ !ref.current.contains(e.target)This means:If the clicked element (e.target) is NOT inside your dropdown → user clicked outside. If all conditions are true setAccordianDashboard(false);→ CLOSE the accordion.

        setAccordianDashboard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accordianDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  return (
    <div className="w-full md:flex-1 text-black p-4 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="w-full bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 shadow-lg text-white rounded-lg flex px-4 py-2 justify-between items-center">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setAccordianDashboard((prev) => !prev);
          }}
        />

        <img
          className="w-12 h-12 rounded-lg border-2"
          src="./m.jpg"
          alt="Image"
        />
      </div>

      {accordianDashboard && (
        <div
          ref={ref}
          className=" absolute right-4 top-16 p-3 bg-slate-800 border border-slate-600 shadow-xl backdrop-blur-md text-white rounded-xl text-lg font-extralight"
        >
          <div>Hi Welcome to our Gym Management System.</div>
          <p>Feel free to ask any querries</p>
        </div>
      )}

      <div className="mt-5 pt-3 mx-auto  bg-opacity-50 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">
        {/* this is the card block */}
        <Link
          to={"/member"}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl  ">
            <img
              src="./j.webp"
              alt="Joined img"
              className="w-40 sm:w-52 md:w-60 mx-auto h-32 sm:h-36 md:h-40 pt-4 object-contain"
            />
            {/* <PeopleAltIcon sx={{ color: "green", fontSize: "50px" }} /> */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide">Joined Members</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link
          to={`/specific/monthly-members`}
          onClick={() => handleOnClickMenu("Monthly_Joined")}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl ">
            <img src="./g.webp" alt="" className="w-60 pt-4 mx-auto h-40" />
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide"> Monthly Joined </p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link
          to={`/specific/Expiring_within_2_weeks`}
          onClick={() => handleOnClickMenu("Expiring_within_2_weeks")}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl ">
            <img
              src="./w.webp"
              alt="renew img"
              className="w-60 mx-auto h-40 pt-4"
            />
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide">
              Expiring within 2 weeks
            </p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link
          to={"/specific/within-4-7-expiring"}
          onClick={() => handleOnClickMenu("Expiry in 4-7 days")}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1  flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl ">
            <img
              src="./r.webp"
              alt="4-7 days img"
              className="w-60 mx-auto h-40 pt-4"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide">
              Expiring in 4-7 Days
            </p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link
          to={"/specific/expired-member"}
          onClick={() => handleOnClickMenu("Expired")}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl ">
            <img
              src="./e.webp"
              alt=" expired img"
              className="w-60 mx-auto h-40 pt-4 "
            />

           <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide">Expired</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link
          to={"/specific/inactive-member"}
          onClick={() => handleOnClickMenu("Inactive_members")}
          className="w-full min-h-[180px] border bg-slate-800 border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className="py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl">
            <img src="./m.webp" alt="" className="w-60 mx-auto h-40 pt-4" />
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-semibold tracking-wide">Inactive Users</p>
          </div>
        </Link>
      </div>

      <div className="p-4 w-full md:w-[80%] lg:w-[60%] mx-auto bg-slate-800 border border-slate-600 shadow-lg text-white mt-10 rounded-xl text-sm sm:text-lg text-center">
        Contact Developer for any Technical Error at 8859420169
      </div>
    </div>
  );
};

export default Dashboard;
