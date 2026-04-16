import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/loader";
import axios from "axios";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contentVal, setContentValue] = useState("Submit Your Email");

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOTP();
    } else {
      changePassword();
    }
  };

  const verifyOTP = async () => {
    try {
      setLoader(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/checkotp`,
        {
          email: inputField.email,
          otp: inputField.otp,
        }
      );

      setOtpValidate(true);
      setContentValue("Change Password");

      toast.success(res.data.message);
      setLoader(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Server error";

      toast.error(errorMessage);
      setLoader(false);
    }
  };

  const sendOtp = async () => {
    try {
      setLoader(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/sendOtp`,
        { email: inputField.email }
      );

      setEmailSubmit(true);
      setContentValue("Verify OTP");

      toast.success(res.data.message);
      setLoader(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong";

      toast.error(errorMessage);
      setLoader(false);
    }
  };

  const changePassword = async () => {
    try {
      setLoader(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          email: inputField.email,
          newPassword: inputField.newPassword,
        }
      );

      toast.success(res.data.message);
      setLoader(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Unable to change password";

      toast.error(errorMessage);
      setLoader(false);
    }
  };

  const handleChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="space-y-5">

        {/* Email */}

        <div>
          <label className="text-sm font-semibold">
            Enter Your Email
          </label>

          <input
            type="text"
            value={inputField.email}
            onChange={(event) => handleChange(event, "email")}
            className="w-full mt-1 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Email"
          />
        </div>

        {/* OTP */}

        {emailSubmit && (
          <div>
            <label className="text-sm font-semibold">
              Enter OTP
            </label>

            <input
              type="text"
              value={inputField.otp}
              onChange={(event) => handleChange(event, "otp")}
              className="w-full mt-1 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
            />
          </div>
        )}

        {/* New Password */}

        {otpValidate && (
          <div>
            <label className="text-sm font-semibold">
              Enter New Password
            </label>

            <input
              type="password"
              value={inputField.newPassword}
              onChange={(event) => handleChange(event, "newPassword")}
              className="w-full mt-1 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter New Password"
            />
          </div>
        )}

        {/* Button */}

        <button
          onClick={handleSubmit}
          className="w-full bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-black transition"
        >
          {contentVal}
        </button>

      </div>

      {loader && <Loader />}

      <ToastContainer />

    </div>
  );
};

export default ForgotPassword;