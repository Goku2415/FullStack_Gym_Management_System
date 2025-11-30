import React,{useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
// import MemberCard2 from '../../Components/MemberCard/memberCard2.jsx';
import MemberCard from '../../Components/MemberCard/memberCard.jsx';

const GeneralUser = () => {

    const [header , setHeader] = useState("");

    useEffect(()=>{
        const func = sessionStorage.getItem('func');//here we are gettting the value of func from session storage which we had set in dashboard.jsx
        setHeader(func);
    },[])

    const functioncall = async()=>{
        switch(func){
            case "Monthly_Joined":
                setHeader("5 Monthly joined members");
                break;

            case 'Expiring_within_2_weeks':
                setHeader("Members with 3 days membership expiry");
                break;

            case 'Expiry in 4-7 days':
                setHeader("Expiry in 4-7 days members");
                break;

            case "Expired":
                setHeader("Expired Members");
                break;

            case "Inactive_members":
                setHeader("Inactive Users");
                break;

        }
    }


  return (
    <div className='text-black h-screen p-3 w-3/4 flex-col '>
        <div className="border-2 bg-slate-800 flex justify-between w-full text-white rounded-lg p-3">
            <Link to={'/dashboard'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-linear-to-r from-sky-300 to-fuchsia-300'>
                <ArrowBackIcon/>Back To Dashboard
            </Link>
        </div>

        <div className="mt-5 text-xl text-slate-900 font-semibold ">
            {header}
        </div>

        <div className="bg-slate-500 p-4 mt-2 rounded-lg overflow-y-auto  h-[80%]">
            <div className="gird gap-5 grid-cols-3 bg-opacity-50  flex flex-wrap justify-center items-center ">
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>

            </div>
            
        </div>

    </div>
  )
}

export default GeneralUser
