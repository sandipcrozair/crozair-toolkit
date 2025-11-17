import { Clock } from "lucide-react";
import React from "react";

export function VacuumHeader() {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-sm mx-auto mb-4 sm:mb-6">
        {/* <FiActivity className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> */}
        <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" size={24} />
      </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
        Vacuum Evacuation Calculator
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
        Calculate any parameter by entering 4 out of 5 fields (Volume, Flow
        Rate, Start Pressure, End Pressure, Time)
      </p>
    </div>
  );
}
