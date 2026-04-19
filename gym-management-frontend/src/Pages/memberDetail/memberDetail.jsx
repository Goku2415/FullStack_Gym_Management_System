import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import api from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState(false);
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Debug ID
  useEffect(() => {
    console.log("URL:", window.location.pathname);
    console.log("ID from params:", id);
  }, [id]);

  // ✅ Initial load
  useEffect(() => {
    if (id) {
      fetchData();
      fetchMembership();
    } else {
      toast.error("Invalid Member ID");
    }
  }, [id]);

  // ✅ Fetch member data
  const fetchData = async () => {
    try {
      console.log("Calling API with ID:", id);

      const res = await api.get(`/members/get-member/${id}`);

      console.log("API RESPONSE:", res.data);

      if (!res.data.member) {
        toast.error("Member not found");
        return;
      }

      const member = res.data.member;
      setData(member);

      // ✅ Status calculation
      if (member?.nextBillDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextBill = new Date(member.nextBillDate);
        setStatus(nextBill >= today);
      }

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      toast.error("Failed to fetch member data");
    }
  };

  // ✅ Fetch membership plans
  const fetchMembership = async () => {
    try {
      const res = await api.get(`/plans/get-memberships`);

      const memberships = res.data.membership || [];
      setMembership(memberships);

      if (memberships.length > 0) {
        setPlanMember(memberships[0]._id);
      }

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch membership data");
    }
  };

  // ✅ Date check
  const isDateInPast = (inputDate) => {
    if (!inputDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0);

    return givenDate < today;
  };

  // ✅ Select plan
  const handleOnChangeSelect = (e) => {
    setPlanMember(e.target.value);
  };

  // ✅ Renew membership
  const handleRenewSaveBtn = async () => {
    try {
      const res = await api.put(`/members/update-member-plan/${id}`, {
        membership: planMember,
      });

      const updatedMember = res.data.member;
      setData(updatedMember);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextBill = new Date(updatedMember.nextBillDate);
      setStatus(nextBill >= today);

      setRenew(false);

      toast.success("Membership renewed successfully");

    } catch (err) {
      console.log(err);
      toast.error("Failed to renew membership");
    }
  };

  return (
    <div className="w-full md:flex-1 p-3 md:p-4">
      
      {/* ✅ DEBUG DISPLAY (you can remove later) */}
      <div style={{ color: "red", fontWeight: "bold" }}>
        Current ID: {id}
      </div>

      <div className="p-4 rounded-lg w-full text-xl text-white bg-slate-500 border-2 shadow-2xl">
        <span
          onClick={() => navigate(-1)}
          className="border rounded-xl text-white hover:bg-[#1e3d7b] cursor-pointer px-3 py-2"
        >
          <ArrowBackIcon />
          Go Back
        </span>
      </div>

      <div className="mt-4 bg-white p-4 md:p-6 min-h-[70vh] rounded-lg shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">

          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={data?.profilePic}
              alt="Profile"
              className="w-52 h-52 object-cover rounded-2xl"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-3">

            <div>Name: {data?.name}</div>
            <div>Mob: {data?.mobile}</div>
            <div>Location: {data?.location}</div>

            <div>
              Joined Date:{" "}
              {data?.createdAt
                ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                : "N/A"}
            </div>

            <div>
              Next Bill Date:{" "}
              {data?.nextBillDate
                ? data.nextBillDate.slice(0, 10).split("-").reverse().join("-")
                : "N/A"}
            </div>

            <div>
              Status:
              <Switch checked={status} disabled />
            </div>

            {isDateInPast(data?.nextBillDate) && (
              <div onClick={() => setRenew(!renew)}>
                Membership expired. Click to renew.
              </div>
            )}

            {renew && (
              <div>
                <select value={planMember} onChange={handleOnChangeSelect}>
                  {membership.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.months} Months
                    </option>
                  ))}
                </select>

                <button onClick={handleRenewSaveBtn}>
                  Renew Membership
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MemberDetail;