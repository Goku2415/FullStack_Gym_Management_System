import React, { useState } from "react";
import Login from "../../Components/Login/login.jsx";
import SignUp from "../../Components/Signup/signUp.jsx";

const Home = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[url('/47.jpg')] bg-cover bg-center flex items-center">

      <div className="ml-10 md:ml-24">

        {isLogin ? <Login /> : <SignUp />}

        <div className="mt-4 text-white">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Home;