import React from "react";

const Loader = () => (
  <div className="flex justify-center items-center h-full text-gray-500 text-lg">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400 mr-2"></div>
    Loading...
  </div>
);

export default Loader;
