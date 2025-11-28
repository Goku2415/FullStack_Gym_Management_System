import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/MemberCard/memberCard';

const GeneralUser = () => {
  return (
    <div className='text-black p-5 w-3/4 flex-col '>
        <div className="border-2 bg-slate-800 flex justify-between w-full text-white rounded-lg p-3">
            <Link to={'/dashborad'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-linear-to-r from-sky-300 to-fuchsia-300'>
                <ArrowBackIcon/>General User Dashboard
            </Link>
        </div>

        <div className="mt-5 text-xl text-slate-900">
            {"5 Monthly joined members"}
        </div>

        <div className="bg-slate-200 p-5 mt-5 rounded-lg gird gap-2 grid-cols-3 overflow-x-auto  h-[80%]">
            <MemberCard/>
        </div>

    </div>
  )
}

export default GeneralUser
