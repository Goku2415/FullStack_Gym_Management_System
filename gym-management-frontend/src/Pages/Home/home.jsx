import React from "react";
import Login from "../../Components/Login/login.jsx";
import SignUp from "../../Components/Signup/signUp.jsx";

const Home = () => {

  return (
  
  <div className="w-full h-screen ">
      <div className='w-full bg-cover  flex justify-center h-full mb-20 bg-[url("/47.jpg")] '>
        <div className="w-full flex gap-48 ">
          <Login />
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Home;
