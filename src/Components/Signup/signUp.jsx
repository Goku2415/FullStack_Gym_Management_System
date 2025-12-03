import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';




const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);

    const [inputField, setInputField] = useState({email: "",gymName: "",userName: "",password: "",profilePic: "/y.jpg"});

    const [loaderImage, setLoaderImage] = useState(false);

    const [loader , setLoader] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnChange = (event,name) => {
        setInputField(prev => ({ ...prev, [name]:event.target.value }));
        //... is a spread operator the stores all the previous state 
    };

    //This block of code is used to update the image of the signup page as for each user the image will be different so we have to upload the image to cloudinary and get the url of the image and store it in the database. 
    const uploadImage = async(event)=>{
        setLoaderImage (true);
        const files = event.target.files;
        const data= new FormData();
        data.append('file', files[0]);
        
        data.append("upload_preset", "gym-management")

        try{
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwapgarrx/image/upload",data);
            const imageUrl = response.data.secure_url;
            setInputField({...inputField, ['profilePic']:imageUrl});
            setLoaderImage (false);//the loader for the image to stop the loader once the image is uploaded
        }catch(err){
            console.log(err);
            setLoaderImage (false);//the loader for the image to stop the loader if any error occurs during the upload
        }
    }
    
        
    

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

            <input name="email" value={inputField.email} onChange={(event)=>{handleOnChange(event,"email")}} type='text' className='w-full mb-10 p-2 rounded-lg hover:bg-white cursor-pointer border-2' placeholder='Enter Email' />
            {/* The value attribute that i have taken is used to take dynamic input, we are using because of useState hook which we have defined initially  */}

            <input name="username" value={inputField.userName} onChange={(event)=>{handleOnChange(event,"userName")}} type='text' className='w-full mb-10 p-2 rounded-lg border-2 cursor-pointer hover:bg-white ' placeholder='Enter Username' />

            <input name="password" value={inputField.password} onChange={(event)=>{handleOnChange(event,"password")}} type='password' className='w-full mb-10 p-2 rounded-lg border-2 cursor-pointer hover:bg-white ' placeholder='Enter password' />

            <input type="file" onChange={(event)=>{uploadImage(event)}} className="w-full mb-10 p-2  rounded-lg border-2 cursor-pointer hover:bg-white"/>


            {loaderImage  &&
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />
                </Stack>
            }


            <div className="flex w-full gap-8 " >
                <img src={inputField.profilePic} className='mb-10 rounded-lg h-[200px] w-[150px]' alt="Profile" />
                
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