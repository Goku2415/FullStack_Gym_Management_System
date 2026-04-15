import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        loginField,
        { withCredentials: true },
      );
      console.log(res.data.gym);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.gym.userName);
      localStorage.setItem("gymName", res.data.gym.gymName);
      localStorage.setItem("profilePic", res.data.gym.profilePic);
      localStorage.setItem("isLogin", "true");

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;

      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const handleOnChange = (event, name) => {
    setLoginField((prev) => ({ ...prev, [name]: event.target.value }));
  };

  return (
    <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
 className="bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-xl w-[320px] transition duration-300 hover:scale-105"
>
      <div className="font-sans text-black text-center text-3xl  ">
        Login
      </div>

      <input
        name="userName"
        value={loginField.userName}
        onChange={(event) => {
          handleOnChange(event, "userName");
        }}
        type="text"
        className="w-full my-10 p-2 hover:bg-white text-black rounded-lg border-2 cursor-pointer "
        placeholder="Enter Username"
      />

      <input
        name="password"
        value={loginField.password}
        onChange={(event) => {
          handleOnChange(event, "password");
        }}
        type="password"
        className="w-full mb-10 p-2 rounded-lg hover:bg-white border-2 cursor-pointer"
        placeholder="Enter Password"
      />

      <button
        type="submit"
        className="p-2 w-full sm:w-[60%] md:w-[50%] border-2 bg-slate-800 mx-auto block rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
      >
        Login
      </button>
      <ToastContainer />
    </form>
  );
};

export default Login;
