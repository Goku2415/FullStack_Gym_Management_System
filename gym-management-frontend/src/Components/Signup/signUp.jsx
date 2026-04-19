import React, { useState } from "react";
import "./signUp.css";
import Modal from "../Modal/modal";
import ForgotPassword from "../ForgotPassword/forgotPassword";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const SignUp = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  const [inputField, setInputField] = useState({
    email: "",
    userName: "",
    password: "",
    profilePic: "/y.jpg",
  });

  const [loaderImage, setLoaderImage] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setInputField((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);

    const files = event.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        // ✅ use axios NOT api
        "https://api.cloudinary.com/v1_1/dwapgarrx/image/upload",
        data,
      );

      const imageUrl = response.data.secure_url;

      setInputField((prev) => ({ ...prev, profilePic: imageUrl }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoaderImage(false);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", inputField);

      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      const errorMessage = err.response?.data?.error || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer />

      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Register Your Gym
        </h2>

        <input
          name="email"
          value={inputField.email}
          onChange={(event) => handleOnChange(event, "email")}
          type="text"
          placeholder="Enter Email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="userName"
          value={inputField.userName}
          onChange={(event) => handleOnChange(event, "userName")}
          type="text"
          placeholder="Enter Username"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* <input
          name="gymName"
          value={inputField.gymName}
          onChange={(event) => handleOnChange(event, "gymName")}
          type="text"
          placeholder="Enter Gym Name"
          className="w-full p-3 border rounded-lg mb-4"
        /> */}

        <input
          name="password"
          value={inputField.password}
          onChange={(event) => handleOnChange(event, "password")}
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          onChange={(event) => uploadImage(event)}
          className="w-full mb-4 p-2 border rounded-lg cursor-pointer"
        />

        {loaderImage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}

        <div className="flex items-center gap-6 mt-6">
          <img
            src={inputField.profilePic}
            className="h-32 w-24 object-cover rounded-lg border"
            alt="Profile"
          />

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={handleRegister}
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Register
            </button>

            <button
              onClick={handleClose}
              className="w-full border border-black p-3 rounded-lg hover:bg-gray-100 transition"
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>

      {forgotPassword && (
        <Modal
          header="Forgot Password"
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      )}
    </div>
  );
};

export default SignUp;
