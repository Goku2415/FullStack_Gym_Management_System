import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">

      <Box className="flex flex-col items-center gap-4">

        <CircularProgress
          size="5rem"
          thickness={4}
          sx={{ color: "white" }}
        />

        <p className="text-white text-lg font-semibold">
          Loading...
        </p>

      </Box>

    </div>
  );
};

export default Loader;