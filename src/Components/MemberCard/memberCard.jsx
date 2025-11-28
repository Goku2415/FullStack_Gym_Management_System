import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

const MemberCard = ({ item }) => {


    // const id = item?._id || "unknown";
    // const profilePic = item?.profilePic || "https://via.placeholder.com/150";
    // const status = item?.status || "Inactive";

  return (
    <Link to={`/member/${item._id}`} 
      className="bg-white rounded-lg p-3 hover:bg-linear-to-r  from-sky-300  to-fuchsia-300 hover:text-white cursor-pointer">

      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full"
          src='./6.jpg'
          alt="Profile Pic"
        />
        <CircleIcon className="absolute top-0 left-0"
          sx={{ color: item.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>

      <div className="mx-auto mt-2 text-center text-xl font-mono">
        Next Bill Date: {item.nextBillDate || "N/A"}
      </div>
    </Link>
  );
};

export default MemberCard;
