import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const MemberCard = ({ item }) => {

  const [status, setStatus] = useState(false);


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextBill = item?.nextBillDate
    ? new Date(item.nextBillDate)
    : null;

  let dotColor = "green";

  if (nextBill) {
    const diffTime = nextBill - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      dotColor = "red";          // Expired
    } else if (diffDays <= 7) {
      dotColor = "orange";       // Expiring soon
    } else {
      dotColor = "green";        // Active
    }
  }

  return (
    <Link
      to={`/member/${item?._id || "unknown"}`}
      className="bg-white w-84 h-60 ml-1 rounded-lg p-3 hover:bg-neutral-200 hover:shadow-2xl cursor-pointer"
    >
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full"
          src={item?.profilePic || "http://via.placeholder.com/150"}
          alt="Profile Pic"
        />
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: dotColor }}
        />
      </div>

      <div className="mx-auto mt-2 text-center text-xl font-mono">
        <div>{item?.name}</div>
        <div>{item?.mobileNo}</div>
        <div>
          Next Bill Date:{" "}
          {item?.nextBillDate
            ? new Date(item.nextBillDate).toLocaleDateString("en-GB")
            : "N/A"}
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;