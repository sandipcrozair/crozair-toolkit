import React from "react";

export function ExamplesSection({ examples, onLoadExample }) {
  return (
    <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-white/60 p-4 sm:p-6 lg:p-8">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
        </div>
        Quick Examples
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {examples.map((example, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onLoadExample(example)}
            className="text-left p-3 sm:p-4 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-lg sm:rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-200 transform hover:scale-105"
          >
            <div className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
              {example.name}
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              {example.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
