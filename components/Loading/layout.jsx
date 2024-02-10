import React from "react";

const LoadingSpinner = ({ show = false }) => {
  return show ? (
    <div className="flex flex-col flex-1 justify-center items-center py-10">
      <div className="animate-spin rounded-full h-6 w-6 mr-2 border-2 border-black border-r-2 border-r-transparent" />
    </div>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
