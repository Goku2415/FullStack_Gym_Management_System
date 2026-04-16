import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Addmembers = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    joiningDate: "",
    membership: "",
    profilePic: "./add.jpg",
  });

  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOnChange = (event, name) => {
    setInputField((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleRegisterButton = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/members/register-member`,
        inputField,
        { withCredentials: true }
      );

      setInputField({
        name: "",
        mobileNo: "",
        address: "",
        joiningDate: "",
        membership: "",
        profilePic: "./add.jpg",
      });

      toast.success("Member added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add member");
    }
  };

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField((prev) => ({ ...prev, membership: value }));
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);

    const files = event.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwapgarrx/image/upload",
        data
      );

      const imageUrl = response.data.secure_url;

      setInputField((prev) => ({ ...prev, profilePic: imageUrl }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoaderImage(false);
    }
  };

  const fetchMemberships = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/plans/get-memberships`,
        { withCredentials: true }
      );

      const memberships = res.data.membership || [];
      setMembershipList(memberships);

      if (memberships.length === 0) {
        toast.error("No memberships available. Please add memberships first.");
        return;
      }

      const firstMembership = memberships[0]._id;

      setSelectedOption(firstMembership);
      setInputField((prev) => ({
        ...prev,
        membership: firstMembership,
      }));
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch memberships");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <div className="text-black w-full max-w-3xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">

        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          placeholder="Name of Joinee"
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          placeholder="Mobile No."
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          placeholder="Enter Address"
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="date"
          value={inputField.joiningDate}
          onChange={(e) => handleOnChange(e, "joiningDate")}
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        >
          {membershipList.map((item) => (
            <option key={item._id} value={item._id}>
              {item.months} Months Membership
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={uploadImage}
          className="border p-2 rounded-md"
        />

        <div className="space-y-3">
          {loaderImage && (
            <Stack spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}

          <img
            src={inputField.profilePic}
            alt="Preview"
            className="rounded-lg h-40 object-cover border"
          />
        </div>

        <button
          onClick={handleRegisterButton}
          className="bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-black transition w-40 h-16 mt-10"
        >
          Register
        </button>

      </div>

      <ToastContainer />

    </div>
  );
};

export default Addmembers;