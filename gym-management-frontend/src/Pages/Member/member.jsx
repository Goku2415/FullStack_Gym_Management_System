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

import { ToastContainer, toast } from 'react-toastify';

 
const Member = () => {
    const [addMembership, setAddmemberShip] = useState(false);
    const [addMember, setAddmember] = useState(false)

    const [data, setData] = useState([
        {_id: "1", profilePic: "./ss.png", status: "Active"},
        {_id: "2", profilePic: "./ss.png", status: "Inactive"},
        {_id: "3", profilePic: "./ss.png", status: "Active"},]);

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
        fetchData();
    }, [])

    const fetchData = async () => {
        let totalData = 54;
        setTotalData(totalData);

        let extraPage = totalData % limit === 0 ? 0 : 1;
        let totalPage = parseInt(totalData / limit) + extraPage;
        setNoOfPage(totalPage);  
     
        if(totalData===0){
            setSTartFrom(0);
            setEndTo(0);
        }else if(totalData<=limit){
            setSTartFrom(0);
            setEndTo(totalData);
        }
    }

    const handleMemberShip = () => {
        setAddmemberShip(prev => !prev);
    }

    const handleMembers = () => {
        setAddmember(prev => !prev);
    }

    // const handleSearchData = () => {
    //     toast.info(`Searching for ${search}`);
    //     setIsSearchModeOn(true);
    // };

    const handlePrev = () => {
    if (currentPage !== 1) {
        const currPage = currentPage - 1;
        setCurrentPage(currPage);
        const from = (currPage - 1) * limit;
        let to = (currPage * limit);
        if (to > totalData) to = totalData;
        setSTartFrom(from);
        setEndTo(to);
    }
    };

    const handleNext = () => {
    if (currentPage !== noOfPage) {
        const currPage = currentPage + 1;
        setCurrentPage(currPage);
        const from = (currPage - 1) * limit;
        let to = (currPage * limit);
        if (to > totalData) {
            to = totalData;
        }
        setSTartFrom(from);
        setEndTo(to);
    }
    };


    return (
        <div className='text-black p-5 w-3/4 h-screen bg-linear-to-r from-[rgb(116,215,220)] to-[rgb(44,110,100)] flex-col '>

            {/* block for banner */}
            <div className='border  bg-slate-900 flex justify-between w-full  text-white rounded-lg p-2'>

                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-linear-to-r  from-sky-300  to-fuchsia-300 hover:text-black' onClick={() => handleMembers()}>Add Member <FitnessCenterIcon /> </div>
                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-linear-to-r  from-sky-300  to-fuchsia-300 hover:text-black' onClick={() => handleMemberShip()}>Membership <AddIcon /> </div>

            </div>

            {/* block for back to dashboard button */}
            <Link to={'/dashboard'}><ArrowBackIcon /> Back to Dashboard </Link>

            <div className='mt-3 w-1/2 flex gap-2'>
                <input type='text' value={search} onChange={(e) => { setSearch(e.target.value) }} className='border-2  w-full p-2 rounded-2xl' placeholder='Search By Name or Mobile No' />
                <div onClick={() => { handleSearchData() }} className='bg-slate-900 p-3 border-2 text-white rounded-2xl cursor-pointer hover:bg-slate-400 '><SearchIcon /></div>
            </div>

            <div className='mt-2 text-xl flex text-white  justify-between '>
                <div>Total Members</div>
                    <div className='flex gap-5'>
                        
                        <div className='mb-3 text-white'>{startFrom + 1} - {endTo} of {totalData} Members</div>
                        
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:bg-linear-to-r  from-sky-300  to-fuchsia-300 hover:text-white bg-blue ${currentPage === 1 ? 'bg-gray-400 ' : 'bg-[rgb(62,87,110)]' }`} onClick={() => { handlePrev() }}><ChevronLeftIcon /></div>
                        
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:bg-linear-to-r  from-sky-300  to-fuchsia-300 hover:text-white  hover:bg-gray ${currentPage === noOfPage ? 'bg-gray-400 ' : 'bg-[rgb(62,87,110)]'}`} onClick={() => { handleNext() }}><ChevronRightIcon /></div>
                    </div>   
            </div>
            
            <div className=' p-3 bg-linear-to-r from-gray-400  bg-opacity-50 grid gap-5 grid-cols-3 rounded-lg  overflow-x-auto h-[72vh]'>
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
                <MemberCard />
            </div>

            {
            addMembership && <Modal header="Add Membership"  handleClose={handleMemberShip} content={<AddmemberShip handleClose={handleMemberShip} />}/>
            }
            {
            addMember && <Modal header={"Add New Member"} handleClose={handleMembers} content={<Addmembers/>} />
            }

        </div>
    )
}

export default Member

