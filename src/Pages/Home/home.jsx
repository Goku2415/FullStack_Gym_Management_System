import React from 'react'
import Login from '../../Components/Login/login.jsx'
import SignUp from '../../Components/Signup/signUp.jsx'

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
        <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl'>
            Welcome To Gym Management System 
        </div>
        <div className='w-full bg-cover flex justify-center h-full bg-[url("./1.jpg")]'>
           <div className="w-full flex gap-32 ">

            <Login/>
            <SignUp/>

           </div>
        </div>
    </div>
  )
}

export default Home