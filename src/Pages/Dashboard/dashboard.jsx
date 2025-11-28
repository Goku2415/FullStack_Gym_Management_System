import React, { useState, useEffect, useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(()=>{
    const handleClickOutside = e => {             //e = the mouse click event object.This function checks where the user clicked.
      if (accordianDashboard && ref.current && !ref.current.contains(e.target)) { //accordianDashboard is true ✔ . This is the DOM element of your accordion container.✔ !ref.current.contains(e.target)This means:If the clicked element (e.target) is NOT inside your dropdown → user clicked outside. If all conditions are true setAccordianDashboard(false);→ CLOSE the accordion.

        setAccordianDashboard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  
  },[accordianDashboard])
  
    const handleOnClickMenu = (value)=>{
      sessionStorage.setItem('func',value);
    }

  return (
    <div className='w-3/4 text-black p-4 relative bg-[rgb(79,51,96)]' >
      <div className='w-full bg-linear-to-r from-sky-300  to-fuchsia-300 text-white rounded-lg flex  px-4 py-1   justify-between items-center'>
        <MenuIcon sx={{ cursor: "pointer" }} onClick={() => { setAccordianDashboard(prev => !prev) }} />

        <img className='w-12 h-12 rounded-lg border-2' src='./m.jpg' alt='Image' />

      </div>

      {
        accordianDashboard && <div ref={ref} className=' absolute p-2 bg-neutral-900 text-white rounded-xl text-lg font-extralight'>
          <div>Hi Welcome to our Gym Management System.</div>
          <p>Feel free to ask any querries</p> 
        </div>
      }

      <div className='mt-5 pt-3 mx-auto  bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'>

        {/* this is the card block */}
        <Link to={'/member'} className="w-full h-[200px] border-2  bg-[rgb(63,87,111)] rounded-lg  cursor-pointer shadow-lg">
          

          <div className='py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl  '> 
            <img src="./j.webp" alt="Joined img" className="w-60 mx-auto h-40 pt-4" />
            {/* <PeopleAltIcon sx={{ color: "green", fontSize: "50px" }} /> */}
            <p className='text-2xl text-white   font-mono'>Joined Members</p>
          </div>
        </Link>


        {/* this is the card block */}
        <Link to={`/specific/monthly`} onClick={()=>handleOnClickMenu("monthlyJoined")} className='w-full h-[200px] border-2 bg-[rgb(63,87,111)] rounded-lg cursor-pointer '>

          <div className='py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl '>
            <img src="./g.webp" alt="" className="w-60 pt-4 mx-auto h-40" />
            <p className='text-2xl text-white  font-mono'> Monthly Joined </p>
          </div>
        </Link>

        {/* this is the card block */}
       <Link  to={`/specific/Expiring within 2 weeks`} onClick={()=>handleOnClickMenu("3 day expire")} className='w-full h-[200px] border-2 bg-[rgb(63,87,111)] rounded-lg cursor-pointer'>

          <div className='py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl '>
            <img src="./w.webp" alt="renew img" className="w-60 mx-auto h-40 pt-4" />
            <p className='text-2xl  text-white font-mono'>Expiring within 2 weeks</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link to={'/specific/expire-with-in 4-7-days'} onClick={()=>handleOnClickMenu("4-7 DaysExpire")} className='w-full h-[200px] border-2 bg-[rgb(63,87,111)] rounded-lg cursor-pointer '>

          <div className='py-1  flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl '>
            <img src="./r.webp" alt="4-7 days img" className="w-60 mx-auto h-40 pt-4" />
            <p className='text-2xl mx-auto w-fit text-white font-mono'>Expiring in 4-7 Days</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("Expired")} className='w-full h-[200px] bg-[rgb(63,87,111)] border-2  rounded-lg cursor-pointer '>
          

          <div className='py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl '>
            <img src="./e.webp" alt=" expired img" className="w-60 mx-auto h-40 pt-4 " />

            <p className='text-2xl text-white font-mono'>Expired</p>
          </div>
        </Link>


        {/* this is the card block */}
        <Link to={'/specific/inactive_Users'} onClick={()=>handleOnClickMenu("Inactive")} className='w-full h-[200px] border-2 bg-[rgb(63,87,111)] rounded-lg cursor-pointer'>

          <div className='py-1 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:shadow-2xl'>
            <img src="./m.webp" alt="" className="w-60 mx-auto h-40 pt-4" />
            <p className='text-2xl text-white font-mono'>Inactive Users</p>
          </div>
        </Link>

      </div>


      <div className='md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-[rgb(22,27,38)] text-white mt-20 rounded-xl text-xl'>
        Contact Developer for any Technical Error at 8859420169
      </div>


    </div>
  )
}

export default Dashboard