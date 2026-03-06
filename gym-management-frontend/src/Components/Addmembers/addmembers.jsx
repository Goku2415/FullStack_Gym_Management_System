import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


const Addmembers = () => {

  const [inputField, setInputField] = useState({name: "", mobileNo: "", address: "",joiningDate: "",membership: "", profilePic: "./add.jpg"});
  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  
  const handleOnChange = (event,name) => {
    setInputField(prev => ({ ...prev,[name]:event.target.value}));
    
  };
  
  
  const handleRegisterButton = async () => {
    await axios.post("http://localhost:4000/members/register-member", inputField, {withCredentials:true}).then((res) => {
      setInputField({name: "", mobileNo: "", address: "",joiningDate: "",membership: "", profilePic: "./add.jpg"});
      toast.success("Member added!",res.data.message);
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to add member");
    });
  };


  
  const handleOnChangeSelect = (event) => {
    let value= event.target.value ;
    setSelectedOption(value);
    setInputField(prev => ({...prev,membership: value})); // Set the selected membership in inputField
  };
  //this block of code is used to update the image of the addmembers page as for each user the image will be different so we have to upload the image to cloudinary and get the url of the image and store it in the database similar to signup page.
  const uploadImage = async(event)=>{
        const files = event.target.files;
        const data= new FormData();
        data.append('file', files[0]);
        
        data.append("upload_preset", "gym-management")

        try{
            const response = await axios.post("http://api.cloudinary.com/v1_1/dwapgarrx/image/upload",data);
            const imageUrl = response.data.secure_url;
            setInputField({...inputField, ['profilePic']:imageUrl});
        }catch(err){
            console.log(err);
        }
    }


    const fetchMemberships = async () => {
        try {
          const res = await axios.get("http://localhost:4000/plans/get-memberships", {withCredentials:true}); // adapt endpoint
          // setMembership(res.data.membership || []);
          toast.success(res.data.membership.length+ "Memberships fetched successfully");
          setMembershipList(res.data.membership || []); // Store the fetched memberships in state

          if(res.data.membership.length === 0){
            return toast.error("No memberships available. Please add memberships first.",
              {className: "toast-error"}
            );
          }
          else{
            let a = res.data.membership[0]._id;
            setSelectedOption(a); // Set the first membership as the default selected option});
            setInputField(prev => ({...prev,membership: a})); // Set the first membership as the default selected option in inputField
            //  setMembershipList(a);

          }
          

        }catch (err) {
          console.log(err);
          toast.error("Unable to fetch memberships");
        }
      };




    useEffect(() => {
      console.log(inputField);
      fetchMemberships();
    }, []);
  
  return (
    <div className='text-black  '>
      <div className='grid gap-5 grid-cols-2 text-lg'>

        <input name='name'  onChange={(event)=>handleOnChange(event,"name")} value={inputField.name} placeholder='Name of  Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        
        <input name='mobileNo' onChange={(event)=>handleOnChange(event, "mobileNo")} value={inputField.mobileNo} placeholder='Mobile No.' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        
        <input name='address'   onChange={(event)=>handleOnChange(event,"address")} value={inputField.address} placeholder='Enter Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        
        <input name='joiningDate'  onChange={(event)=>handleOnChange(event,"joiningDate")} value={inputField.joiningDate} placeholder='Joining Date' type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 ' />



        <select onChange={(event)=>handleOnChangeSelect(event,"membership")}  value={selectedOption} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
          
          {
            membershipList.map((item, index) => {
              return (
                <option key={index} value={item._id} >{item.months} Months Membership</option>

              )
            })
          }
        </select>

        <input type='file' onChange={(event)=>{uploadImage(event)}} className='border-2 rounded-lg p-2 border-slate-400 w-[90%] placeholder:text-gray  '    />

        <div className="">
          { loaderImage &&   //show loader when the image is being uploaded
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
            </Stack>
          }
          <img src={inputField.profilePic} alt="The shadow photo " className="rounded-lg h-40 "/>
        </div>

        <div onClick={handleRegisterButton} className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-neutral-600 '>Register</div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Addmembers