import React, { useState, useEffect } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Modal from '../../Components/Modal/modal.jsx';
import MemberCard from '../../Components/MemberCard/memberCard.jsx';
import AddmemberShip from '../../Components/Addmembership/addmemberShip.jsx';
import Addmembers from '../../Components/Addmembers/addmembers.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Member = () => {
    const [addMembership, setAddmemberShip] = useState(false);
    const [addMember, setAddmember] = useState(false)
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchModeOn, setIsSearchModeOn] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);

    const [startFrom, setSTartFrom] = useState(0);
    const [endTo, setEndTo] = useState(9);
    const [totalData, setTotalData] = useState(0);
    const [limit, setLimit] = useState(9);

    const [noOfPage, setNoOfPage] = useState(0);

    useEffect(() => {
        fetchData(0, 9);
    }, [])

    const fetchData = async () => {
        let totalData = 52;
        setTotalData(totalData);
        
        


    }

    const handleMemberShip = () => {
        setAddmemberShip(prev => !prev);
    }

    const handleMembers = () => {
        setAddmember(prev => !prev);
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            // .       
            // .
            // Please Watch the youtube video for full code 
            // .
            // .
            // .
        }
    }

    const handleNext = () => {
        if (currentPage !== noOfPage) {
            
        }
    }

    // const handleSearchData = async () => {
   

    // }
    return (
        <div className='text-black p-5 w-3/4 h-[100vh]'>

            {/* block for banner */}
            <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>

                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 hover:text-black' onClick={() => handleMembers()}>Add Member <FitnessCenterIcon /> </div>
                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 hover:text-black' onClick={() => handleMemberShip()}>Membership <AddIcon /> </div>

            </div>

            {/* block for back to dashboard button */}
            <Link to={'/dashboard'}><ArrowBackIcon /> Back to Dashboard </Link>

            <div className='mt-5 w-1/2 flex gap-2'>
                <input type='text' value={search} onChange={(e) => { setSearch(e.target.value) }} className='border-2 w-full p-2 rounded-lg' placeholder='Search By Name or Mobile No' />
                <div onClick={() => { handleSearchData() }} className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 hover:text-black'><SearchIcon /></div>
            </div>

            <div className='mt-5 text-xl flex justify-between text-slate-900'>
                <div>Total Members {isSearchModeOn ?totalData:null}</div>
                    <div className='flex gap-5'>
                        <div>{startFrom + 1} - {endTo} of {totalData} Members</div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handlePrev() }}><ChevronLeftIcon /></div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 from-blue-400 via-purple-400 to-yellow-400 ${currentPage === noOfPage ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handleNext() }}><ChevronRightIcon /></div>
                    </div> 
            </div>

        
            <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[70vh]'>
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

            {addMembership && <Modal header="Add Membership" handleClose={handleMemberShip} content={<AddmemberShip handleClose={handleMemberShip} />} />}
            {addMember && <Modal header={"Add New Member"} handleClose={handleMembers} content={<Addmembers />} />}
            <ToastContainer />
        </div>
    )
}

export default Member