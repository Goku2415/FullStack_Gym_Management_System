import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard/memberCard.jsx";
import {
  getMonthlyJoined,
  threeDayExpire,
  fourToSevenDaysExpire,
  expired,
  inActiveMembers,
} from "./data";
import { useParams } from "react-router-dom";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const { page } = useParams();

  useEffect(() => {
    
    if (page) {
      console.log("PAGE PARAM:", page);
      functionCall(page);
    }
  }, [page]);

  const functionCall = async (func) => {
    try {
      let datas = [];

      switch (func) {
        case "monthly-members":
          setHeader("Monthly joined members");
          datas = await getMonthlyJoined();
          break;

        case "Expiring_within_2_weeks":
          setHeader("Members with 3 days membership expiry");
          datas = await threeDayExpire();
          break;

        case "within-4-7-expiring":
          setHeader("Expiry in 4-7 days members");
          datas = await fourToSevenDaysExpire();
          console.log("API DATA:", datas);
          break;

        case "expired-member":
          setHeader("Expired Members");
          datas = await expired();
          break;

        case "inactive-member":
          setHeader("Inactive Users");
          datas = await inActiveMembers();
          break;

        default:
          console.log("No matching route found");
      }


      setData(Array.isArray(datas) ? datas : []);
    } catch (error) {
      console.error("ERROR:", error);
      setData([]);
    }
  };

  return (
    
    <div className="text-black p-3 md:p-4 w-full md:flex-1 min-h-screen flex flex-col">
      <div className="border bg-slate-800 flex items-center w-full text-white rounded-lg p-3">
        <Link
          to={"/dashboard"}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer"
        >
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>

      <div className="mt-5 text-lg sm:text-xl md:text-2xl text-slate-900 font-semibold">{header}</div>

      <div className="bg-slate-500 p-4 mt-2 rounded-lg overflow-y-auto min-h-[60vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, index) => (
            <MemberCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralUser;
