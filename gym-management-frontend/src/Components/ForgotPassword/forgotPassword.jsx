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
        "http://localhost:4000/auth/reset-password/checkotp",
        {
          email: inputField.email,
          otp: inputField.otp,
        },
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
        "http://localhost:4000/auth/reset-password/sendOtp",
        { email: inputField.email },
      );

      setEmailSubmit(true);
      setContentValue("Verify OTP");
      toast.success(res.data.message);
      setLoader(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong";
      
      toast.error(errorMessage);
      setLoader(false);
    }
  };


    const changePassword = async () => {
      try {
        setLoader(true);
        const res = await axios.post(
          "http://localhost:4000/auth/reset-password", {email:inputField.email,newPassword:inputField.newPassword}
        );

        toast.success(res.data.message);
        setLoader(false);
      } catch (err) {
        const errorMessage = err.response?.data?.error || "Unable to change password";
        toast.error(errorMessage);
        setLoader(false);
      }
    };



  const handleChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };



  return (
    <div className="w-full mx-10   rounded-lg text-black ">
      <div className="w-[60vh]  mb-5 ">
        <div>Enter Your Email</div>
        <input
          type="text"
          value={inputField.email}
          onChange={(event) => {
            handleChange(event, "email");
          }}
          className=" w-full p-2 rounded-lg border-2 border-slate-400  "
          placeholder="Enter Email"
        />
      </div>

      {emailSubmit && (
        <div className="w-[60vh]  mb-5 ">
          <div>Enter your OTP</div>
          <input
            type="text"
            value={inputField.otp}
            onChange={(event) => {
              handleChange(event, "otp");
            }}
            className=" w-full p-2 rounded-lg border-2 border-slate-400  "
            placeholder="Enter OTP"
          />
        </div>
      )}

      {otpValidate && (
        <div className="w-[60vh]  mb-5 ">
          <div>Enter New Password</div>
          <input
            type="text"
            value={inputField.newPassword}
            onChange={(event) => {
              handleChange(event, "newPassword");
            }}
            className=" w-full p-2 rounded-lg border-2 border-slate-400  "
            placeholder="Enter New Password"
          />
        </div>
      )}

      <div
        className="bg-slate-900 text-white mx-40 w-fit  mt-10 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black"
        onClick={() => handleSubmit()}
      >
        {contentVal}
      </div>
      {loader && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
