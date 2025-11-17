import React from "react";

const ErrorState = ({ error }) => {
  return (
    <div className="mb-6 sm:mb-8 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center mx-2 sm:mx-0">
      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <span className="text-red-600 text-sm sm:text-base lg:text-lg font-bold">
          !
        </span>
      </div>
      <p className="text-red-700 font-medium text-sm sm:text-base">{error}</p>
    </div>
  );
};

export default ErrorState;
