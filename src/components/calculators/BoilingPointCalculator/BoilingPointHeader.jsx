import React from "react";
import { Sparkles } from "lucide-react";

export function BoilingPointHeader({ BoilIcon }) {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6 lg:p-8 text-white overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full -translate-y-8 sm:-translate-y-10 lg:-translate-y-16 translate-x-8 sm:translate-x-10 lg:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full translate-y-6 sm:translate-y-8 lg:translate-y-12 -translate-x-6 sm:-translate-x-8 lg:-translate-x-12"></div>

      <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-6">
        <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-xl sm:rounded-2xl lg:rounded-3xl backdrop-blur-sm">
          <img
            src={BoilIcon}
            alt="Boil Icon"
            className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain filter invert"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent leading-tight">
            Boiling Point Calculator
          </h1>
          <p className="text-orange-100 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg leading-snug sm:leading-relaxed">
            Calculate boiling points at different pressures using the
            Clausius-Clapeyron equation
          </p>
        </div>
        <div className="hidden sm:block">
          <Sparkles className="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
        </div>
      </div>
    </div>
  );
}
