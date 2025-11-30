import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddmemberShip = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  // const handleOnChange = (event, name) => {
  //     setInputField({ ...inputField, [name]: event.target.value })
  // }

  // const fetchMemberships = async () => {
  // try {
  //   const res = await axios.get("http://localhost:4000/membership/get"); // adapt endpoint
  //   setList(res.data.data || []);
  // } catch (err) {
  //   console.error(err);
  //   toast.error("Unable to fetch memberships");
  // }
  // };

  // useEffect(() => {
  //     fetchMemberships()
  // }, []);

  const [membershipList, setMembershipList] = useState([]);

  // const handleAddmembership = () => {
  // toast.success(`Added ${inputField.months} month(s) membership`);
  // setMembershipList(prev => [...prev, inputField]);
  // };

  // const handleChange = (e) => {
  // const { name, value } = e.target;
  // setMembership(prev => ({ ...prev, [name]: value }));
  // };

  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5  items-center justify-center grid-cols-2 ">
        
        {/* Block for membership Details */}
        <div className="text-lg bg-slate-800 text-white rounded-lg border-2 pl-2 pr-2 flex-col justify-between p-1 ">
          <div>1 Month Membership </div>
          <div>Rs 1000 </div>
        </div>

        {/* Block for membership Details */}
        <div className="text-lg bg-slate-800 text-white border-2 rounded-lg pl-2 pr-2 flex-col  justify-between p-1 ">
          <div>3 Month Membership </div>
          <div>Rs 3500 </div>
        </div>
        {/* Block for membership Details */}
        <div className="text-lg bg-slate-800 text-white border-2 pl-2 pr-2 rounded-lg flex-col justify-between p-1 ">
          <div>6 Month Membership </div>
          <div>Rs 6000 </div>
        </div>
        {/* Block for membership Details */}
        <div className="text-lg bg-slate-800 text-white border-2 pl-2 pr-2 flex-col rounded-lg justify-between p-1 ">
          <div>12 Month Membership </div>
          <div>Rs 10000 </div>
        </div>
      </div>

      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10">
        <input
          value={inputField.months}
          onChange={(event) => handleOnChange(event, "months")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add No. of Months"
        />

        <input
          value={inputField.price}
          onChange={(event) => handleOnChange(event, "price")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add Price"
        />

        <div
          onClick={() => {
            AddmemberShip();
          }}
          className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-linear-to-r  from-sky-300  to-[rgb(116,215,220)]"
        > Add +
        </div>
      </div>
    </div>
  );
};

export default AddmemberShip;
