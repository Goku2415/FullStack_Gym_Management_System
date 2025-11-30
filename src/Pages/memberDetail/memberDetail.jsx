import React , {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate   } from 'react-router-dom';
import Switch from 'react-switch';

const MemberDetail = () => {

  const [status, setStatus] = useState(false);
  const [renew , setRenew] = useState(false);

  const navigate = useNavigate();

  const handleSwitchBtn=()=>{
    let status  = status === "active" ? "inactive" : "active";
    setStatus(status);
  }



  return (
    <div className="w-3/4 text-violet-600 p-3">
        <div onClick={()=>{navigate(-1)}} className="bordedr-2 p-5 rounded-lg w-full text-xl text-white bg-slate-500 shadow-2xl">
          {/* This navigate function is used to track the history of the users last page and using -1 navigates users to previous page wherever it may be */}
        <ArrowBackIcon/> Go Back
        </div>

        <div className="mt-10 bg-white p-5 rounded-lg shadow-2xl">
          <div className="w-full h-fit flex ">
            <div className="w-1/3 mx-auto">
              <img src="/ippo.jpg" alt="" className="" />
            </div>

            <div className="w-2/3 mt-5 text-xl p-5">
              <div className="mt-1 mb-2 text-xl font-semibold">Name : Dan</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Mob : 7894651235</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Location : Bangalore</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Joined Date : 12/12/2025</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Next Bill Date : 10/05/2025</div>
              <div className="mt-1 mb-2 text-xl font-semibold">status :<Switch oncolor='#6366f1' checked={status==="active"}  onChange={()=>{handleSwitchBtn()}}  /> </div>
              <div onClick={()=>{setRenew(prev => !prev)}}  className={`mt-1 rounded-lg p-3 border-2 border-slate-800 text-color w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 `}>Renew</div>
            </div>

          </div>

        </div>


    </div>
  )
}

export default MemberDetail
