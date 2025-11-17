import React from "react";
import { Droplets, ChevronDown } from "lucide-react";
import { categoryColors, categoryIcons } from "../../../constant/constant";

export function SubstanceSelector({
  selectedSubstance,
  selectedSubstanceData,
  isSubstanceOpen,
  groupedSubstances,
  onSubstanceChange,
  onToggleDropdown,
  validationErrors,
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <label className="block text-gray-700 font-bold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl flex items-center gap-2">
        <Droplets className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />
        Select Substance
      </label>

      <div className="relative">
        <button
          onClick={onToggleDropdown}
          className={`w-full border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-lg transition-all duration-300 text-left flex items-center justify-between group hover:border-orange-300 ${
            selectedSubstanceData
              ? `bg-gradient-to-r ${selectedSubstanceData.color} bg-opacity-10`
              : ""
          } ${
            validationErrors.substance
              ? "border-red-300 bg-red-50/50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {selectedSubstanceData ? (
              <>
                <div
                  className={`w-2 h-6 sm:w-3 sm:h-8 rounded-full bg-gradient-to-b ${selectedSubstanceData.color} flex-shrink-0`}
                ></div>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate block">
                    {selectedSubstance}
                  </span>
                  <span
                    className={`${
                      selectedSubstanceData.Hvap === null
                        ? "text-white"
                        : "text-gray-500"
                    } text-xs sm:text-sm lg:text-base block`}
                  >
                    {selectedSubstanceData.Hvap !== null
                      ? `(${selectedSubstanceData.Hvap} kJ/mol)`
                      : "(Please enter Hvap value)"}
                  </span>
                </div>
              </>
            ) : (
              <span
                className={`text-sm sm:text-base lg:text-lg ${
                  validationErrors.substance && "text-gray-500"
                }`}
              >
                Choose a substance...
              </span>
            )}
          </div>
          <ChevronDown
            className={`transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 ${
              isSubstanceOpen ? "rotate-180" : ""
            } ${validationErrors.substance ? "text-red-400" : "text-gray-400"}`}
          />
        </button>

        {/* Validation Error Message */}
        {validationErrors.substance && (
          <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
            {/* <span>⚠</span> */}
            {validationErrors.substance}
          </p>
        )}

        {isSubstanceOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-2xl max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto">
            {Object.entries(groupedSubstances).map(([category, items]) => {
              const Icon = categoryIcons[category];
              return (
                <div key={category}>
                  <div
                    className={`sticky top-0 px-3 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase tracking-wider border-b ${categoryColors[category]} flex items-center gap-2`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {category}
                  </div>
                  {items.map((substance) => (
                    <button
                      key={substance.name}
                      onClick={() => onSubstanceChange(substance)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-2 sm:gap-4"
                    >
                      <div
                        className={`w-1.5 h-6 sm:w-2 sm:h-8 rounded-full bg-gradient-to-b ${substance.color} flex-shrink-0`}
                      ></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate">
                          {substance.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {substance.Hvap !== null
                            ? `${substance.Hvap} kJ/mol`
                            : "Please enter Hvap value"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
