import React from "react";
import {
  FaMapMarkerAlt,
  FaMountain,
  FaWind,
  FaCompass,
  FaRuler,
  FaMapPin,
} from "react-icons/fa";

const LocationSummary = ({ data }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg border border-blue-100 p-4 sm:p-6 lg:p-8 xl:p-10 mx-2 sm:mx-0">
      {/* Header */}
      <div className="flex items-center mb-6 sm:mb-8 lg:mb-10">
        <div className="w-1.5 sm:w-2 h-6 sm:h-8 lg:h-10 bg-blue-600 rounded-full mr-3 sm:mr-4"></div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 tracking-tight">
          Summary
        </h3>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
        {/* Elevation Card */}
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 shadow-sm sm:shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm mr-3 sm:mr-4 lg:mr-5">
                <FaMountain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 tracking-wide">
                ELEVATION
              </h4>
            </div>

            <div className="my-4 sm:my-6 w-full">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                    {data.elevation_ft.toFixed(0)}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                    Feet
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                    {data.elevation_m}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                    Meter
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm font-semibold text-blue-800 tracking-wide uppercase">
                Above Sea Level
              </p>
            </div>
          </div>
        </div>

        {/* Vacuum Pressure Card */}
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 border-2 border-blue-100 shadow-sm sm:shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm mr-3 sm:mr-4 lg:mr-5">
                <FaWind className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 tracking-wide">
                VACUUM PRESSURE
              </h4>
            </div>

            <div className="my-4 sm:my-6 w-full">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                    {data.vacuum_mbar}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                    mbar
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                    {data.vacuum_mmHg}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                    mmHg
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                    {data.vacuum_torr}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                    torr
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm font-semibold text-blue-800 tracking-wide uppercase">
                Vacuum Pressure Environment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Pressure Card */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl mb-4 sm:mb-6 p-4 sm:p-6 border-2 border-blue-100 shadow-sm sm:shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm mr-3 sm:mr-4 lg:mr-5">
              <FaWind className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
            <h4 className="text-base sm:text-s lg:text-lg xl:text-xl font-bold text-blue-900 tracking-wide">
              ATMOSPHERIC PRESSURE
            </h4>
          </div>

          <div className="my-4 sm:my-6 w-full">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                <p className="text-base sm:text-md lg:text-lg font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                  {data.pressure_mbar}
                </p>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                  mbar
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                <p className="text-base sm:text-md lg:text-lg font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                  {data.pressure_mmHg}
                </p>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                  mmHg
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm border border-blue-100">
                <p className="text-base sm:text-md lg:text-lg font-bold text-blue-900 mb-1 sm:mb-2 leading-none">
                  {data.pressure_torr}
                </p>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                  torr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="border-t border-blue-200 pt-4 sm:pt-6">
        <div className="flex items-center mb-6 sm:mb-8 lg:mb-10">
          <div className="w-1.5 sm:w-2 h-5 sm:h-6 lg:h-8 bg-blue-600 rounded-full mr-3 sm:mr-4"></div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 tracking-tight">
            Other Information
          </h3>
        </div>

        <div className="bg-blue-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-blue-100 shadow-sm">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Latitude */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg sm:rounded-xl mr-2 sm:mr-3 lg:mr-4">
                    {/* <FaMapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-700" /> */}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-blue-900 tracking-wide">
                    Latitude
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-blue-900 font-mono">
                  {data.latitude.toFixed(6)}°
                </span>
              </div>
            </div>

            {/* Longitude */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg sm:rounded-xl mr-2 sm:mr-3 lg:mr-4">
                    {/* <FaMapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-700" /> */}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-blue-900 tracking-wide">
                    Longitude
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-blue-900 font-mono">
                  {data.longitude.toFixed(6)}°
                </span>
              </div>
            </div>

            {/* Location Accuracy */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-blue-100 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg sm:rounded-xl mr-2 sm:mr-3 lg:mr-4">
                    {/* <FaRuler className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-700" /> */}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-blue-900 tracking-wide">
                    Location Accuracy
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-blue-900 font-mono">
                  ±{data.accuracy_meters || 3} m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSummary;
