import React from "react";
import { FaMountain } from "react-icons/fa";

import AltimeterIcon from "../../../assets/altitude.png";

const Header = () => {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm sm:shadow-md mx-auto mb-4 sm:mb-5 lg:mb-6">
        {/* <FaMountain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" /> */}
        <img
          src={AltimeterIcon}
          alt="AltimeterIcon"
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain invert"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
        Altimeter
      </h1>

      <p className="text-sm sm:text-base lg:text-lg xl:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed sm:leading-loose px-4 sm:px-6">
        Precise elevation data with atmospheric measurements for your current
        location
      </p>

      <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-4 sm:mt-5 lg:mt-6" />
    </div>
  );
};

export default Header;
