import React from "react";

export function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50/80 border border-red-200 rounded-lg sm:rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 text-red-700">
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xs sm:text-sm font-medium">{error}</p>
      </div>
    </div>
  );
}
