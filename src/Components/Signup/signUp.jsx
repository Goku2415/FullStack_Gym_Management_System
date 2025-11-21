import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);

    const [loaderImage, setLoaderImage] = useState(false);

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputField(prev => ({ ...prev, [name]: value }));
    };



    return (
        <div className='customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto'>
            <div className='font-sans text-white text-center text-3xl '>Register Your Gym</div>


            <input name="email" value={inputField.email} onChange={handleOnChange} type='text'  className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Email' />


            <input name="gymName" value={inputField.gymName} onChange={handleOnChange} type='text'  className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Gym Name' />


            <input name="userName" value={inputField.userName} onChange={handleOnChange} type='text' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter UserName' />

            <input name="password" value={inputField.password} onChange={handleOnChange} type='password'  className='w-full mb-10 p-2 rounded-lg' placeholder='Enter password' />
            
            <input type='file'  className='w-full mb-10 p-2 rounded-lg' />

           

            <img src={inputField.profilePic} className='mb-10 h-[200px] w-[250px]' />


            <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={()=>handleRegister()}>Register</div>
            <div className='p-2 w-[80%] mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={() => handleClose()}>Forgot Password</div>

            {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
        </div>
    )
}

export default SignUp