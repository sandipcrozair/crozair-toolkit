import React from "react";
import { FiRefreshCw, FiArrowRight } from "react-icons/fi";
import { usePressureConverter2 } from "../../../hooks/usePressureConverter";
import { getUnitIcon } from "../../../utils/unitIcons";
import PressureIcon from "../../../assets/pressure.png";
import Loader from "../../Loader";

const PressureConverter2 = () => {
  const {
    // State
    inputValue,
    inputUnit,
    outputValue,
    outputUnit,
    loading,
    error,
    results,
    allUnits,
    unitLabels,
    unitCategories,
    lastChanged,

    // Actions
    setInputValue,
    setInputUnit,
    setOutputValue,
    setOutputUnit,
    swapUnits,
    reset,
    convert,

    // Helper functions
    formatValue,
    getUnitDisplayName,
  } = usePressureConverter2();

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Handle output changes
  const handleOutputChange = (e) => {
    const value = e.target.value;
    setOutputValue(value);
  };

  // Handle input unit changes
  const handleInputUnitChange = (e) => {
    setInputUnit(e.target.value);
  };

  // Handle output unit changes
  const handleOutputUnitChange = (e) => {
    setOutputUnit(e.target.value);
  };

  // Handle manual conversion
  const handleManualConvert = () => {
    convert();
  };

  if (loading && (!results || results.length === 0)) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <img
              src={PressureIcon}
              alt="pressure"
              className="w-6 h-6 sm:w-8 sm:h-8 invert"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Pressure Unit Converter
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Convert between {allUnits.length}+ pressure units with precision.
            Change any value or any unit to alter another value.
          </p>
        </div>

        {/* Main Converter */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Input Section */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        lastChanged === "input"
                          ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="relative w-full sm:w-48 flex-shrink-0">
                    <select
                      value={inputUnit}
                      onChange={handleInputUnitChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 appearance-none pr-10 transition-colors bg-white ${
                        lastChanged === "input"
                          ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      {allUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unitLabels[unit]}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getUnitIcon(inputUnit)}
                    </div>
                  </div>
                </div>
                {lastChanged === "input" && (
                  <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                    Changing this will update output
                  </p>
                )}
              </div>

              {/* Conversion Controls */}
              <div className="flex flex-row lg:flex-col justify-center items-center gap-3 sm:gap-4 py-2 lg:py-0">
                <button
                  onClick={swapUnits}
                  className="p-2 sm:p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title="Swap units"
                  type="button"
                >
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
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </button>

                {/* <button
                  onClick={handleManualConvert}
                  disabled={loading || (!inputValue && !outputValue)}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-sm sm:text-base"
                  type="button"
                >
                  {loading ? (
                    <FiRefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  ) : (
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="hidden sm:inline">Convert</span>
                </button> */}
              </div>

              {/* Output Section */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={outputValue}
                      onChange={handleOutputChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        lastChanged === "output"
                          ? "border-green-500 ring-2 ring-green-200 bg-green-50"
                          : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                      }`}
                      placeholder="Result"
                    />
                  </div>
                  <div className="relative w-full sm:w-48 flex-shrink-0">
                    <select
                      value={outputUnit}
                      onChange={handleOutputUnitChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 appearance-none pr-10 transition-colors bg-white ${
                        lastChanged === "output"
                          ? "border-green-500 ring-2 ring-green-200 bg-green-50"
                          : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                      }`}
                    >
                      {allUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unitLabels[unit]}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getUnitIcon(outputUnit)}
                    </div>
                  </div>
                </div>
                {lastChanged === "output" && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    Changing this will update input
                  </p>
                )}
              </div>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Converting...</span>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="flex flex-wrap justify-end gap-2 mt-4">
              <button
                onClick={reset}
                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                type="button"
              >
                Reset
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}
          </div>

          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 text-blue-600">
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Converting...</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && !loading && (inputValue || outputValue) && (
            <div className="border-t border-gray-200">
              <div className="p-4 sm:p-6">
                {/* Main Result */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          lastChanged === "input" ? "text-blue-700" : ""
                        }`}
                      >
                        {formatValue(inputValue)}
                        {lastChanged === "input" && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Source
                          </span>
                        )}
                      </span>{" "}
                      <span
                        className={`inline-flex items-center gap-1 ${
                          lastChanged === "input"
                            ? "text-blue-700 font-semibold"
                            : ""
                        }`}
                      >
                        {inputUnit}
                      </span>{" "}
                      ={" "}
                      <span
                        className={`inline-flex items-center gap-1 ${
                          lastChanged === "output" ? "text-green-700" : ""
                        }`}
                      >
                        {formatValue(outputValue)}
                        {lastChanged === "output" && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Source
                          </span>
                        )}
                      </span>{" "}
                      <span
                        className={`inline-flex items-center gap-1 ${
                          lastChanged === "output"
                            ? "text-green-700 font-semibold"
                            : ""
                        }`}
                      >
                        {outputUnit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex items-center justify-center gap-2">
                      {lastChanged === "input"
                        ? `Converted from input value`
                        : `Converted from output value`}
                    </p>
                  </div>
                </div>

                {/* All Units Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {results.map(({ unit, value }) => {
                    const isInputUnit = unit === inputUnit;
                    const isOutputUnit = unit === outputUnit;
                    const isSourceUnit =
                      (lastChanged === "input" && isInputUnit) ||
                      (lastChanged === "output" && isOutputUnit);

                    return (
                      <div
                        key={unit}
                        className={`border-2 rounded-lg p-3 sm:p-4 transition-all duration-200 ${
                          isOutputUnit
                            ? "border-green-300 bg-green-50"
                            : isInputUnit
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 bg-white"
                        } ${
                          isSourceUnit ? "ring-2 ring-opacity-70 shadow-md" : ""
                        } ${
                          isSourceUnit && isInputUnit
                            ? "ring-blue-400"
                            : isSourceUnit && isOutputUnit
                            ? "ring-green-400"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                              isInputUnit
                                ? "text-blue-600"
                                : isOutputUnit
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {getUnitIcon(unit)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-semibold text-sm sm:text-base truncate ${
                                isInputUnit
                                  ? "text-blue-700"
                                  : isOutputUnit
                                  ? "text-green-700"
                                  : "text-gray-900"
                              }`}
                            >
                              {formatValue(value)}
                            </div>
                            <div className="text-xs text-gray-500 uppercase font-mono truncate">
                              {unit}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 truncate">
                          {unitLabels[unit]}
                        </div>

                        {/* Status indicator */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {isInputUnit && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Input
                            </span>
                          )}
                          {isOutputUnit && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Output
                            </span>
                          )}
                          {isSourceUnit && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Source
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Change Legend */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Input Unit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Output Unit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-700">Source Value</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Unit Categories */}
        <div className="mt-8 sm:mt-12 bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-center text-white mb-6 sm:mb-8">
            Unit Categories ({allUnits.length}+ Units)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(unitCategories).map(([category, units]) => (
              <div
                key={category}
                className="bg-gray-700/50 rounded-lg p-4 sm:p-6 border border-gray-600"
              >
                <h4 className="text-base font-semibold text-white mb-3 sm:mb-4 text-center">
                  {category} ({units.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {units.map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center space-x-2 text-gray-300 text-sm p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                    >
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {getUnitIcon(unit)}
                      </div>
                      <span className="truncate flex-1">
                        {getUnitDisplayName(unit)}
                      </span>
                      <span className="text-gray-500 text-xs font-mono flex-shrink-0">
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressureConverter2;
