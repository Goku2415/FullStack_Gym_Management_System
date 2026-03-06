import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState("");
  const [renew, setRenew] = useState(false);

  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);

  const [planMember, setPlanMember] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/members/get-member/${id}`,
        { withCredentials: true },
      );
      setData(res.data.member);

      const member = res.data.member;

      if (member?.nextBillDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextBill = new Date(member.nextBillDate);

        if (nextBill < today) {
          setStatus(false); // Expired
        } else {
          setStatus(true); // Active
        }
      }

      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch member data");
    }
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/plans/get-memberships`,
        { withCredentials: true },
      );
      // console.log(res.data);
      setMembership(res.data.membership);
      setPlanMember(res.data.membership[0]._id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch membership data");
    }
  };

  // const handleSwitchBtn = async () => {
  //   const newStatus = status === "Active" ? "Pending" : "Active";
  //   try {
  //     const res = await axios.post(
  //       `http://localhost:4000/members/change-status/${id}`,
  //       { status: newStatus },
  //       { withCredentials: true },
  //     );

  //     setStatus(newStatus);
  //     toast.success("status updated successfully");
  //   } catch (err) {
  //     toast.error("Failed to update status");
  //   }
  // };

  const isDateInPast = (inputDate) => {
    if (!inputDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0);
    return givenDate < today;
  };

  const handleOnChangeSelect = (e) => {
    let value = e.target.value;
    setPlanMember(value);
  };

  const handleRenewSaveBtn = async () => {
  try {
    let res = await axios.put(
      `http://localhost:4000/members/update-member-plan/${id}`,
      { membership: planMember },
      { withCredentials: true }
    );

    const updatedMember = res.data.member;
    setData(updatedMember);

    const today = new Date();
    today.setHours(0,0,0,0);

    const nextBill = new Date(updatedMember.nextBillDate);

    setStatus(nextBill >= today);

    setRenew(false);

    toast.success("Membership renewed successfully");

  } catch (err) {
    toast.error("Failed to renew membership");
  }
};

  return (
    <div className="w-3/4   p-2">
      <div className="p-4 rounded-lg w-full text-xl text-white bg-slate-500 border-2  shadow-2xl">
        {/* This navigate function is used to track the history of the users last page and using -1 navigates users to previous page wherever it may be */}
        <span
          onClick={() => {
            navigate(-1);
          }}
          className="border-2 rounded-2xl text-white hover:bg-[#1e3d7b] mx-auto my-auto cursor-pointer p-2"
        >
          {" "}
          <ArrowBackIcon sx={{ cursor: "pointer", marginBottom: "2px" }} />
          Go Back
        </span>
      </div>

      <div className="mt-4 bg-white p-4 h-[80%] rounded-lg shadow-2xl">
        <div className="w-full flex flex-col md:flex-row gap-8 ">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={data?.profilePic}
              alt="Profile"
              className="w-64 h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3 text-lg space-y-3">
            <div className="mt-1 mb-2 text-xl font-semibold">
              Name :{data?.name}
            </div>
            <div className="mt-1 mb-2 text-xl font-semibold">
              Mob : {data?.mobile}
            </div>
            <div className="mt-1 mb-2 text-xl font-semibold">
              Location : {data?.location}
            </div>

            <div className="mt-1 mb-2 text-xl font-semibold">
              Joined Date :{" "}
              {data?.createdAt
                ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                : "N/A"}
            </div>

            <div className="mt-1 mb-2 text-xl font-semibold">
              Next Bill Date :
              {data?.nextBillDate
                ? data.nextBillDate.slice(0, 10).split("-").reverse().join("-")
                : "N/A"}
            </div>

            <div className="mt-1 mb-2 text-xl font-semibold">
              Status :
              <Switch onColor="#6366F1" checked={status} disabled={true} />
            </div>
            {isDateInPast(data?.nextBillDate) ? (
              <div
                onClick={() => setRenew((prev) => !prev)}
                className="mt-3 p-3 rounded-lg text-center font-semibold bg-red-100 text-red-700 border border-red-400 cursor-pointer hover:bg-red-200 transition"
              >
                Membership expired. Click to renew.
              </div>
            ) : null}

            {renew &&  (
              <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-md w-full md:w-2/3">
                <div className="mb-2 font-semibold">Select Membership</div>

                <select
                  value={planMember}
                  onChange={handleOnChangeSelect}
                   className="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    
                >
                  {membership.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.months} Months Membership
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleRenewSaveBtn}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl transition duration-200"
   
                >
                  Renew Membership
                </button>
              </div>
            ) }
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
