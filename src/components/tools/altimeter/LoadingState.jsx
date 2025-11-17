import React from "react";

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-3 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">
          Calculating elevation data...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
