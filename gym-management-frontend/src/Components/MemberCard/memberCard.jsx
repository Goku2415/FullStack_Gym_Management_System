import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

const MemberCard = () => {
  
  
  // const id = item?._id || "unknown";
  // const profilePic = item?.profilePic || "https://via.placeholder.com/150";
  // const status = item?.status || "Inactive";

  return (
    <Link
      to={`/member/123`}
      className="bg-white w-84 h-60 ml-1 rounded-lg p-3 hover:bg-neutral-200  hover:shadow-2xl cursor-pointer">
        
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full"
          src="./c.jpg"
          alt="Profile Pic"
        />
      </div>

      <div className="mx-auto mt-2 text-center text-xl font-mono">
        <div className="">Jhon doe</div>
        <div className="">Joined-1/1/25</div>
        Next Bill Date:{"31-12-2025"}
      </div>
    </Link>
  );
};

export default MemberCard;
