import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddmemberShip = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);
  
  


  const fetchMemberships = async () => {
  try {
    const res = await axios.get("http://localhost:4000/plans/get-memberships", {withCredentials:true}); // adapt endpoint
    setMembership(res.data.membership || []);
    
    
    toast.success(res.data.membership.length + " Memberships fetched successfully");
    

  } catch (err) {
    console.log(err);
    toast.error("Unable to fetch memberships");
  }
  };



  useEffect(() => {
      fetchMemberships()
  }, []);


  const handleAddmembership = async () => {
  // toast.success(`Added ${inputField.months} month(s) membership`);
  // setMembershipList(prev => [...prev, inputField]);

    axios.post("http://localhost:4000/plans/add-membership", inputField, {withCredentials:true}).then((res) => {
      toast.success(res.data.message);
      fetchMemberships(); // Refresh the list after adding
      handleClose(); // Close the add membership form
    }).catch((err) => {
      console.error(err);
      toast.error("Failed to add membership");
    });
  };
  



  const handleOnChange =(event,months)=>{
    setInputField({...inputField,[months]:event.target.value })
  }

  console.log(inputField);
  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5  items-center justify-center grid-cols-2 ">
        
        {/* This is the code i had used during building my frontend, and after integrated the backend i have commented it out and used the code below to fetch the data from backend and display it in frontend, but i have kept this code here for reference purpose only.
        
        ##Block for membership Details
        <div className="text-lg bg-slate-800 text-white rounded-lg border-2 pl-2 pr-2 flex-col justify-between p-1 ">
          <div>1 Month Membership </div>
          <div>Rs 1000 </div>
        </div>

          ##Block for membership Details
        <div className="text-lg bg-slate-800 text-white border-2 rounded-lg pl-2 pr-2 flex-col  justify-between p-1 ">
          <div>3 Month Membership </div>
          <div>Rs 3500 </div>
        </div>

        ##Block for membership Details
        <div className="text-lg bg-slate-800 text-white border-2 pl-2 pr-2 rounded-lg flex-col justify-between p-1 ">
          <div>6 Month Membership </div>
          <div>Rs 6000 </div>
        </div>

        ##Block for membership Details
        <div className="text-lg bg-slate-800 text-white border-2 pl-2 pr-2 flex-col rounded-lg justify-between p-1 ">
          <div>12 Month Membership </div>
          <div>Rs 10000 </div>
        </div> */}


          { 
            membership.map((item, index)=>{
            return(
              <div key={index} className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-3 ">
                <div>{item.months} Month Membership </div>
                <div>Rs {item.price} </div>
              </div>
            );
            })
          }





      </div>

      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10">
        <input value={inputField.months} onChange={(event) => handleOnChange(event, "months")} className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2" type="number" placeholder="Add No. of Months"
        />

        <input value={inputField.price} onChange={(event) => handleOnChange(event, "price")} className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2" type="number" placeholder="Add Price"
        />

        <div onClick={handleAddmembership} className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-linear-to-r  from-sky-300  to-[rgb(116,215,220)]"
          > Add +
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddmemberShip;
