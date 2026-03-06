import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ handleClose, content, header }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">

      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 animate-fadeIn">

        {/* Header */}

        <div className="flex items-center justify-between border-b pb-3">

          <h2 className="text-2xl font-semibold">
            {header}
          </h2>

          <button
            onClick={handleClose}
            className="hover:bg-gray-200 p-2 rounded-full transition"
          >
            <ClearIcon />
          </button>

        </div>

        {/* Content */}

        <div className="mt-6">
          {content}
        </div>

      </div>

    </div>
  );
};

export default Modal;