import React from "react";

const TechnicalInfo = ({ technicalInfo }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100 p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
      <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6">
        Technical Information
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 text-center">
        {technicalInfo.map((item, index) => (
          <div
            key={item.label}
            className="bg-white/50 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 font-medium">
              {item.label}
            </p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalInfo;
