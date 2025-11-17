import React, { useEffect } from "react";
import { useElevationCalculator } from "../../../hooks/useElevationCalculator";
import { getElevationIcon } from "../../../utils/elevationIcons";
import Header from "./Header";
import DataCard from "./DataCard";
import LocationSummary from "./LocationSummary";
import TechnicalInfo from "./TechnicalInfo";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const ElevationCalculator = ({ fetchElevation, data, loading, error }) => {
  const {
    isVisible,
    // cardData,
    // technicalInfo,
    manualRefetch,
    lastCoordinates,
    isMonitoring,
  } = useElevationCalculator(fetchElevation, data, loading, error);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
        <Header />

        {/* Auto-refetch Status */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center flex-wrap gap-2 justify-between bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isMonitoring ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  Auto-refetch: {isMonitoring ? "Active" : "Inactive"}
                </p>
                {lastCoordinates && (
                  <p className="text-xs text-gray-500">
                    Last location: {lastCoordinates.lat.toFixed(6)},{" "}
                    {lastCoordinates.lon.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* Refetch Button */}
            <button
              onClick={manualRefetch}
              disabled={loading}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 transform hover:scale-105 active:scale-95
                ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                }
              `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  <span>Refetching...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="whitespace-nowrap">
                    {/* Show different text based on screen size */}
                    <span className="hidden sm:inline">Refetch Elevation</span>
                    <span className="sm:hidden">Refetch</span>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && <ErrorState error={error} />}

        {/* Loading State */}
        {loading ? (
          <LoadingState />
        ) : (
          <div
            className={`
              transform transition-all duration-500
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            {/* Data Grid */}
            {data && (
              <div className="space-y-6 sm:space-y-8 lg:space-y-8">
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {cardData.map((item, index) => (
                    <DataCard
                      key={item.key}
                      label={item.label}
                      value={item.value}
                      icon={getElevationIcon(item.key)}
                      unit={item.unit}
                      index={index}
                      data={data}
                    />
                  ))}
                </div> */}

                <LocationSummary data={data} />

                {/* <TechnicalInfo technicalInfo={technicalInfo} /> */}
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Altimeter data calculated using digital elevation models and GPS
            positioning.
            {isMonitoring && " Auto-refetch active when location changes."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElevationCalculator;
