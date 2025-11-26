import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);

    const [inputField, setInputField] = useState({
        email: "",
        gymName: "",
        userName: "",
        password: "",
        profilePic: ""
    });

    const [loaderImage, setLoaderImage] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputField(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = () => {
        if (!inputField.email || !inputField.gymName || !inputField.userName || !inputField.password) {
            toast.error("Please fill in all required fields");
            return;
        }
        // Here you can add registration logic, e.g., API call
        toast.success("Registration successful!");
        // Example: navigate('/dashboard');
        // navigate('/dashboard');
    };

    return (
        <div className='customSignup w-[60vh] p-8 mt-44  ml-44 bg-slate-200 opacity-80 h-[450px] overflow-y-auto rounded-lg text-black '>
            <ToastContainer />
            <div className='font-sans text-black text-center text-3xl mb-6'>Register Your Gym</div>

            <input name="email" value={inputField.email} onChange={handleOnChange} type='text' className='w-full mb-10 p-2 rounded-lg hover:bg-white cursor-pointer border-2' placeholder='Enter Email' />

            <input name="username" value={inputField.userName} onChange={handleOnChange} type='text' className='w-full mb-10 p-2 rounded-lg border-2 cursor-pointer hover:bg-white ' placeholder='Enter Username' />

            <input name="password" value={inputField.password} onChange={handleOnChange} type='password' className='w-full mb-10 p-2 rounded-lg border-2 cursor-pointer hover:bg-white ' placeholder='Enter password' />

            {/* <input type='file' className='w-full mb-10 p-2  rounded-lg border-2 cursor-pointer hover:bg-white' /> */}

            <input type="file" className="w-full mb-10 p-2  rounded-lg border-2 cursor-pointer hover:bg-white  " />


            <div className="flex w-full gap-8 " >
                <img src='./y.jpg' className='mb-10 rounded-lg h-[200px] w-[150px]' alt="Profile" />
                
                <div className="w-full ">
                    <div className='p-2 w-full border-2 bg-slate-800 mt-10 rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={handleRegister}>Register</div>

                    <div className='p-2 w-full mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={handleClose}>Forgot Password</div>
                </div>
            </div>


            {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword  />} />}
        </div>
    )
}

export default SignUp