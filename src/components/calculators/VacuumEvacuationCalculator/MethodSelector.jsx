import React from "react";

export function MethodSelector({ method, setMethod }) {
  return (
    <div className="mb-6 sm:mb-8">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 uppercase tracking-wide">
        Calculation Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* <button
          type="button"
          onClick={() => setMethod("logarithmic")}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-center transition-all duration-300 transform  ${
            method === "logarithmic"
              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg shadow-blue-200"
              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-md"
          }`}
        >
          <div className="font-semibold text-sm sm:text-base mb-1">
            Logarithmic
          </div>
          <div className="text-xs text-gray-500">Precise calculation</div>
        </button> */}
      </div>
    </div>
  );
}
