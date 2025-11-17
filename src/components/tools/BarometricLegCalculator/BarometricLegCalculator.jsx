import React, { useState, useEffect, useRef } from "react";
import { useBarometricCalculator } from "../../../hooks/useBarometricCalculator";
import Loader from "../../Loader";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Liquid density database (kg/m³)
const LIQUID_DENSITIES = [
  { name: "Air", value: 1.225 },
  { name: "Water", value: 1000 },
  { name: "Sea Water", value: 1025 },
  { name: "Ethanol", value: 789 },
  { name: "Methanol", value: 791 },
  { name: "Glycerol", value: 1261 },
  { name: "Mercury", value: 13593 },
  { name: "Oil (Light)", value: 850 },
  { name: "Oil (Heavy)", value: 900 },
  { name: "Gasoline", value: 745 },
  { name: "Diesel", value: 850 },
  { name: "Brine (25% NaCl)", value: 1190 },
  { name: "Sulfuric Acid", value: 1840 },
  { name: "Ethylene Glycol", value: 1113 },
  { name: "Other", value: null },
];

const BarometricLegCalculator = ({
  fetchElevation,
  elevationData,
  loading,
  error,
  onRetry,
  calculateAtmosphericPressureFromElevation,
}) => {
  const [selectedLiquid, setSelectedLiquid] = useState(LIQUID_DENSITIES[1]);
  const [customDensity, setCustomDensity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce custom density input (500ms delay)
  const debouncedCustomDensity = useDebounce(customDensity, 500);

  const {
    calculationMode,
    height,
    pressure,
    isLoading: hookLoading,
    combinedError,
    lastCoordinates,
    handleSeaLevelCalculation,
    handleCurrentLocationCalculation,
  } = useBarometricCalculator(
    fetchElevation,
    elevationData,
    loading,
    error,
    calculateAtmosphericPressureFromElevation
  );

  // Combined loading state - fix the loading issue
  const isLoading = localLoading || hookLoading || loading;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format number to avoid NaN
  const formatNumber = (num, decimals = 2) => {
    if (isNaN(num) || !isFinite(num)) return "0.00";
    return Number(num).toFixed(decimals);
  };

  // Get pressure data from elevationData or use default
  const getPressureData = () => {
    if (elevationData && calculationMode === "currentLocation") {
      return {
        pressure_mbar: elevationData.pressure_mbar || 1013.25,
        pressure_mmHg: elevationData.pressure_mmHg || 760,
        pressure_pa: elevationData.pressure_pa || 101325,
        pressure_torr: elevationData.pressure_torr || 760,
      };
    }

    // For sea level or default
    return {
      pressure_mbar: 1013.25,
      pressure_mmHg: 760,
      pressure_pa: 101325,
      pressure_torr: 760,
    };
  };

  const pressureData = getPressureData();

  // Handle liquid change
  const handleLiquidChange = (liquidName) => {
    const liquid = LIQUID_DENSITIES.find((l) => l.name === liquidName);
    setSelectedLiquid(liquid);
    setShowCustomInput(liquidName === "Other");

    if (liquidName !== "Other") {
      setCustomDensity("");
    }

    setShowResults(false);
    setIsDropdownOpen(false);
  };

  // Handle custom density input change
  const handleCustomDensityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomDensity(value);
    }
    setShowResults(false);
  };

  // Get current density value
  const getCurrentDensityValue = () => {
    if (selectedLiquid.name === "Other") {
      const customValue = parseFloat(debouncedCustomDensity);
      return isNaN(customValue) || customValue <= 0 ? 1000 : customValue;
    }
    return selectedLiquid.value || 1000;
  };

  // Check if custom density is valid
  const isValidCustomDensity = () => {
    if (selectedLiquid.name !== "Other") return true;

    const density = parseFloat(customDensity);
    return customDensity === "" || (!isNaN(density) && density > 0);
  };

  // Handle sea level calculation with current density
  const handleSeaLevelClick = async () => {
    const density = getCurrentDensityValue();

    if (!isValidCustomDensity()) {
      alert("Please enter a valid density value for the custom liquid.");
      return;
    }

    try {
      setLocalLoading(true);
      await handleSeaLevelCalculation(density);
      setShowResults(true);
    } catch (error) {
      console.error("Sea level calculation error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Handle current location calculation with current density
  const handleCurrentLocationClick = async () => {
    const density = getCurrentDensityValue();

    if (!isValidCustomDensity()) {
      alert("Please enter a valid density value for the custom liquid.");
      return;
    }

    try {
      setLocalLoading(true);
      await handleCurrentLocationCalculation(density);
      setShowResults(true);
    } catch (error) {
      console.error("Current location calculation error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Get current density for display
  const getCurrentDensity = () => {
    if (selectedLiquid.name === "Other") {
      return customDensity
        ? parseFloat(customDensity)
        : "Custom (using 1000 kg/m³)";
    }
    return selectedLiquid.value;
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      {isLoading && <Loader />}
      <div className="mx-auto">
        {/* Header Section */}
        {/* <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Barometric Leg
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Calculate maximum condensate lift height in vacuum systems using
            atmospheric pressure principles. Perfect for engineering and
            scientific applications.
          </p>
        </div> */}

        {/*  */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Barometric Leg
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Calculate maximum condensate lift height in vacuum systems using
            atmospheric pressure principles. Perfect for engineering and
            scientific applications.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3 sm:mr-4"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Parameters
              </h2>
            </div>

            {/* Liquid Selection */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                Select Liquid
              </label>

              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  disabled={isLoading}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-300 hover:border-blue-300 hover:shadow-md flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-left truncate pr-2">
                    {selectedLiquid.name}
                    {selectedLiquid.value && (
                      <span className="hidden sm:inline">
                        {" "}
                        ({selectedLiquid.value} kg/m³)
                      </span>
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 sm:mt-2 bg-white border-2 border-blue-200 rounded-xl sm:rounded-2xl shadow-xl max-h-48 sm:max-h-60 md:max-h-72 lg:max-h-80 overflow-y-auto">
                    {LIQUID_DENSITIES.map((liquid, index) => (
                      <button
                        key={liquid.name}
                        onClick={() => handleLiquidChange(liquid.name)}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left transition-all duration-200 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 ${
                          selectedLiquid.name === liquid.name
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700"
                        } ${
                          index === 0 ? "rounded-t-xl sm:rounded-t-2xl" : ""
                        } ${
                          index === LIQUID_DENSITIES.length - 1
                            ? "rounded-b-xl sm:rounded-b-2xl"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base font-medium truncate">
                            {liquid.name}
                          </span>
                          {liquid.value && (
                            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0 ml-2">
                              {liquid.value} kg/m³
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Density Input */}
              {showCustomInput && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-100">
                  <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Enter Custom Density (kg/m³)
                    {customDensity && !isValidCustomDensity() && (
                      <span className="text-red-500 ml-2 text-xs sm:text-sm font-normal">
                        • Invalid value
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={customDensity}
                    onChange={handleCustomDensityChange}
                    placeholder="Enter density in kg/m³"
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border-2 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-300 ${
                      customDensity && !isValidCustomDensity()
                        ? "border-red-300 bg-red-50 ring-2 ring-red-200"
                        : "border-blue-200 hover:border-blue-300"
                    }`}
                    disabled={isLoading}
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 space-y-2 sm:space-y-0">
                    {!customDensity ? (
                      <p className="text-blue-600 text-xs sm:text-sm font-medium flex items-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Using default density: 1000 kg/m³
                      </p>
                    ) : !isValidCustomDensity() ? (
                      <p className="text-red-600 text-xs sm:text-sm font-medium flex items-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
                        Please enter a valid positive number
                      </p>
                    ) : (
                      <p className="text-green-600 text-xs sm:text-sm font-medium flex items-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Using {debouncedCustomDensity} kg/m³
                      </p>
                    )}
                    {customDensity &&
                      customDensity !== debouncedCustomDensity && (
                        <p className="text-blue-500 text-xs sm:text-sm font-medium animate-pulse flex items-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Updating...
                        </p>
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* Calculation Buttons */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <button
                onClick={handleSeaLevelClick}
                disabled={
                  isLoading ||
                  (selectedLiquid.name === "Other" && !isValidCustomDensity())
                }
                className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold sm:font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center shadow-md sm:shadow-lg"
              >
                {isLoading && calculationMode === "seaLevel" ? (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Calculate at Sea Level
                  </>
                )}
              </button>

              <button
                onClick={handleCurrentLocationClick}
                disabled={
                  isLoading ||
                  (selectedLiquid.name === "Other" && !isValidCustomDensity())
                }
                className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold sm:font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center shadow-md sm:shadow-lg"
              >
                {isLoading && calculationMode === "currentLocation" ? (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Calculate at Current Location
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {combinedError && (
              <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl sm:rounded-2xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-amber-800 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                      Location Service Issue
                    </div>
                    <div className="text-amber-700 text-xs sm:text-sm mb-3 sm:mb-4">
                      {combinedError}
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={onRetry}
                        disabled={isLoading}
                        className="px-3 sm:px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border border-amber-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🔄 Try Again
                      </button>
                      <button
                        onClick={handleSeaLevelClick}
                        disabled={
                          isLoading ||
                          (selectedLiquid.name === "Other" &&
                            !isValidCustomDensity())
                        }
                        className="px-3 sm:px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border border-blue-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🌊 Use Sea Level
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Details */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Calculation Details
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    Selected Liquid:
                  </span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                    {selectedLiquid.name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    Density:
                  </span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                    {getCurrentDensity()} kg/m³
                    {selectedLiquid.name === "Other" &&
                      customDensity &&
                      customDensity !== debouncedCustomDensity && (
                        <span className="text-blue-500 text-xs ml-1 sm:ml-2">
                          (updating...)
                        </span>
                      )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    Gravity Constant:
                  </span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                    9.81 m/s²
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3 sm:mr-4"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Results
              </h2>
            </div>

            {showResults ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Barometric Leg Result */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-200 shadow-md sm:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">
                        Barometric Leg
                      </h4>
                    </div>

                    <div className="my-4 sm:my-6 w-full">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm sm:shadow-md border border-blue-100">
                          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">
                            {formatNumber(height.h_meters)}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
                            Meters
                          </p>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm sm:shadow-md border border-blue-100">
                          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">
                            {formatNumber(height.h_feet)}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
                            Feet
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pressure Display */}
                <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-m sm:text-lg lg:text-2xl font-bold text-blue-900">
                        Atmospheric Pressure
                      </h4>
                    </div>

                    <div className="my-6 w-full">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100">
                          <p className="text-m font-bold text-blue-900 mb-2 leading-none">
                            {formatNumber(pressureData.pressure_mbar, 1)}
                          </p>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                            mbar
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100">
                          <p className="text-m font-bold text-blue-900 mb-2 leading-none">
                            {formatNumber(pressureData.pressure_mmHg, 1)}
                          </p>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                            mmHg
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100">
                          <p className="text-m  font-bold text-blue-900 mb-2 leading-none">
                            {formatNumber(pressureData.pressure_torr, 1)}
                          </p>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-tight">
                            torr
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info Display */}
                {lastCoordinates && calculationMode === "currentLocation" && (
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-blue-100 shadow-md">
                    <div className="flex items-center mb-3 sm:mb-4 text-blue-900">
                      {/* <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg> */}
                      <span className="font-bold text-base sm:text-md">
                        Other Information
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                      <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-100">
                        <span className="text-blue-600 font-medium">
                          Latitude:
                        </span>
                        <span className="font-bold text-blue-900 ml-1 sm:ml-2">
                          {lastCoordinates.lat?.toFixed(6)}
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-100">
                        <span className="text-blue-600 font-medium">
                          Longitude:
                        </span>
                        <span className="font-bold text-blue-900 ml-1 sm:ml-2">
                          {lastCoordinates.lon?.toFixed(6)}
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-100">
                        <span className="text-blue-600 font-medium">
                          Elevation:
                        </span>
                        <span className="font-bold text-blue-900 ml-1 sm:ml-2">
                          {lastCoordinates.elevation?.toFixed(2)} meters
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-100">
                        <span className="text-blue-600 font-medium">
                          Pressure:
                        </span>
                        <span className="font-bold text-blue-900 ml-1 sm:ml-2">
                          {formatNumber(pressureData.pressure_pa, 0)} Pa
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border-2 border-dashed border-gray-300">
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-4 sm:mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                    No Calculation Yet
                  </h3>
                  <p className="text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Select your parameters and click "Calculate at Sea Level" or
                    "Calculate at Current Location" to see the results here.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 border-blue-200">
                    <p className="text-base sm:text-lg font-bold text-blue-800 mb-1 sm:mb-2">
                      Formula: h = P / (ρ × g)
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700">
                      Where h = Height (m), P = Pressure (Pa), ρ = Density
                      (kg/m³), g = Gravity (9.81 m/s²)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarometricLegCalculator;
