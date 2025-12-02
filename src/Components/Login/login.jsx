import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify';



const Login = () => {
    
    const [loginField,setLoginField] = useState({"userName":"","password":""});

    const navigate = useNavigate();

    const handleLogin =()=>{
        sessionStorage.setItem("isLogin",true);
        navigate('/dashboard');
        //used the session storage to store the login state of the user and during logout all the data stored in the session storage will be deleted
        
    }

   const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginField(prev => ({ ...prev, [name]: value }));
  };
  
    return (
        <div className='rounded-lg  p-10 mt-44 ml-24 w-[60vh]  bg-slate-200 opacity-80 h-fit'>
            <div className='font-sans text-black text-center text-3xl '>Login</div>

            <input name="userName" value={loginField.userName} onChange={handleOnChange} type='text' className='w-full my-10 p-2 hover:bg-white text-black rounded-lg border-2 cursor-pointer ' placeholder='Enter Username' />

            <input name="password" value={loginField.password} onChange={handleOnChange} type='password' className='w-full mb-10 p-2 rounded-lg hover:bg-white border-2 cursor-pointer' placeholder='Enter Password' />

            <div className='p-2 w-[40%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={()=>{handleLogin()}}>Login</div>
        </div>
    )
}

export default Login