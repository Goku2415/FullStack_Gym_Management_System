import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const Addmembers = () => {

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputField(prev => ({ ...prev,
      [name]: value
    }));
  };

  const handleOnChangeSelect = (event) => {
    setInputField(prev => ({ ...prev, membership: event.target.value }));
  };


  const [inputField, setInputField] = useState({
  name: "",
  mobileNo: "",
  address: "",
  joiningDate: "",
  membership: ""
  });

  const handleRegisterButton = () => {
  toast.success("Member added!");
  };


  
  return (
    <div className='text-black  '>
      <div className='grid gap-5 grid-cols-2 text-lg'>

        <input name='name' onChange={handleOnChange} placeholder='Name of  Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input name='mobileNo' onChange={handleOnChange} placeholder='Mobile No.' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input name='address'  onChange={handleOnChange} placeholder='Enter Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input name='joiningDate' onChange={handleOnChange} placeholder='Joining Date' type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />



        <select onChange={handleOnChangeSelect} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>

          <option value="">Select Membership</option>
          <option value="1 Months Membership">1 Months Membership</option>
          <option value="3 Months Membership">3 Months Membership</option>
          <option value="6 Months Membership">6 Months Membership</option>
          <option value="12 Months Membership">12 Months Membership</option>
        </select>

        <input type='file'/>

        <div className="">
          <img src="./c.jpg" alt="The shadow photo " className="rounded-lg h-40 "/>
        </div>

        <div onClick={handleRegisterButton} className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>

      </div>
    </div>
  )
}

export default Addmembers