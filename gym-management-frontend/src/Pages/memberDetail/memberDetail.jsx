import React , {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate   } from 'react-router-dom';
import Switch from 'react-switch';

const MemberDetail = () => {

  const [status, setStatus] = useState(false);
  const [renew , setRenew] = useState(false);

  const navigate = useNavigate();

  const handleSwitchBtn=()=>{
    let newStatus  = status  ? false : true;
    setStatus(newStatus);
  }



  return (
    <div className="w-3/4   p-2">
       <div className="p-4 rounded-lg w-full text-xl text-white bg-slate-500 border-2  shadow-2xl">
          {/* This navigate function is used to track the history of the users last page and using -1 navigates users to previous page wherever it may be */}
          <span onClick={()=>{navigate(-1)}} className="border-2 rounded-2xl text-white hover:bg-[#1e3d7b] mx-auto my-auto cursor-pointer p-2"> <ArrowBackIcon sx={{ cursor: "pointer", marginBottom: "2px" }} />Go Back</span> 
    
       </div>
      
        <div className="mt-4 bg-white p-4 h-[80%] rounded-lg shadow-2xl">
          <div className="w-full h-fit flex ">
            <div className="w-1/3 mx-auto">
              <img src="/ippo.jpg" alt="" className="h-118 rounded-2xl ml-6 mt-2" />
            </div>


            <div className="w-2/3 text-xl p-2">
              <div className="mt-1 mb-2 text-xl font-semibold">Name : Dan</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Mob : 7894651235</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Location : Bangalore</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Joined Date : 12/12/2025</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Next Bill Date : 10/05/2025</div>
              <div className="mt-1 mb-2 text-xl font-semibold">Status :<Switch checked={status} onChange={()=>{handleSwitchBtn()}}/>  </div>
              <div onClick={()=>{setRenew(prev => !prev)}} className={`mt-1 rounded-lg p-3 border-2 border-slate-800 w-40 md:w-1/2 cursor-pointer hover:text-black ${renew && status?' bg-linear-to-r from-indigo-400 via-purple-400 to-green-300':null} `}>Renew

            </div>

            {
              renew && status ? ( <div className="rounded-lg p-3 mt-5  mb-5 h-fit bg-slate-200 w-[80%] ">
              <div className="w-full">
                <div className="">
                  <div >Membership</div>
                    
                    
                  <select  className="w-full border-2 p-1 rounded-lg my-2 ">
                    <option className='rounded-lg '> 1 Month Plan</option>                      
                    <option className='rounded-lg '> 2 Month Plan</option>
                  </select>
                  <div className={`m-2 rounded-lg p-2 border-2 border-slate-900 text-center w-1/3 mx-auto cursor-pointer hover:text-white hover:bg-linear-to-r from-indigo-400 via-purple-400 to-green-300`}>save</div>                 
                </div>
              </div>
            </div>) : null
            }


           
          </div>








          </div>
        </div>
      </div>
  )
}

export default MemberDetail
