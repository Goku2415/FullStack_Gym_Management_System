import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const AddmemberShip = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const fetchMemberships = async () => {
    try {
      const res = await api.get("/plans/get-memberships", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const memberships = Array.isArray(res.data.membership)
        ? res.data.membership
        : [];
      setMembership(memberships);

      toast.success(
        res.data.membership.length + " Memberships fetched successfully",
      );
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch memberships");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleAddmembership = async () => {
    try {
      const res = await api.post("/plans/add-membership", inputField);
      toast.success(res.data.message);
      fetchMemberships(); // refresh UI
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add membership");
    }
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  return (
    <div className="text-black w-full max-w-3xl mx-auto">
      {/* Membership Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {membership.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-slate-900 text-white rounded-xl shadow-lg p-4 hover:scale-105 transition"
            >
              <div className="text-lg font-semibold">
                {item.months} Month Membership
              </div>

              <div className="text-gray-300 mt-2">₹ {item.price}</div>
            </div>
          );
        })}
      </div>

      {/* Divider */}

      <hr className="my-10 border-gray-300" />

      {/* Add Membership Form */}

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          value={inputField.months}
          onChange={(event) => handleOnChange(event, "months")}
          className="border rounded-lg text-lg p-3 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
          type="number"
          placeholder="Add Months"
        />

        <input
          value={inputField.price}
          onChange={(event) => handleOnChange(event, "price")}
          className="border rounded-lg text-lg p-3 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
          type="number"
          placeholder="Add Price"
        />

        <button
          onClick={handleAddmembership}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition"
        >
          Add +
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddmemberShip;
