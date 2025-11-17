import React from "react";

export function CalculateButton({
  loading,
  onClick,
  gradient = "bg-gradient-to-r from-indigo-500 to-blue-500",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`w-full font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-offset-2
        ${
          loading
            ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white shadow-lg"
            : `${gradient} hover:opacity-90 text-white font-semibold shadow-lg focus:ring-blue-500`
        }`}
    >
      {loading ? (
        <div className="flex items-center justify-center text-sm sm:text-base">
          <svg
            className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Calculating...
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Calculate Missing Parameter
        </div>
      )}
    </button>
  );
}
