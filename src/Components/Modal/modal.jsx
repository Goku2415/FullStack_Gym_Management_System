import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ handleClose, content, header }) => {
  return (
    <div className="w-screen h-screen fixed bg-slate-900  text-black top-0 left-0 flex justify-center ">
      <div className="w-[80vh] bg-white rounded-lg h-fit mt-40  p-5">
        <div className="flex justify-between ">
          <div className="font-semibold text-4xl  ">{header}</div>
          <div className="cursor-pointer " onClick={() => handleClose()}>
            <ClearIcon sx={{ fontSize: "32px" }} />
          </div>
        </div>
        <div className="mt-10 ">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
