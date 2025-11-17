import React from "react";
import { Thermometer, Gauge, Zap, Eraser, Calculator } from "lucide-react";
import BoilIcon from "../../../assets/boil.png";
import { useBoilingPointCalculator } from "../../../hooks/useBoilingPointCalculator";
import { BoilingPointHeader } from "./BoilingPointHeader";
import { SubstanceSelector } from "./SubstanceSelector";
import { InputCard } from "./InputCard";

export default function BoilingPointCalculator() {
  const {
    // State
    selectedSubstance,
    inputs,
    result,
    loading,
    error,
    isSubstanceOpen,
    groupedSubstances,
    selectedSubstanceData,

    // Functions
    handleSubstanceChange,
    handleInputChange,
    handleInputFocus,
    clearAll,
    toggleSubstanceDropdown,
    validationErrors,
    calculateBoilingPoint,
  } = useBoilingPointCalculator();

  // Input field configurations
  const knownValuesFields = [
    {
      field: "P1",
      label: "Pressure (P₁)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-orange-500",
    },
    {
      field: "T1",
      label: "Temperature (T₁)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-orange-500",
    },
    {
      field: "Hvap",
      label: "Enthalpy of Vaporization (ΔHvap)",
      unit: "kJ/mol",
      icon: Zap,
      iconColor: "text-orange-500",
    },
  ];

  const targetValuesFields = [
    {
      field: "P2",
      label: "Target Pressure (P₂)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-red-500",
      helperText: "Enter P₂ to calculate T₂",
    },
    {
      field: "T2",
      label: "Target Temperature (T₂)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-red-500",
      helperText: "Enter T₂ to calculate P₂",
    },
  ];

  const handleSubmit = async () => {
    // Only call API when button is clicked
    await calculateBoilingPoint();
  };

  // Check if form is valid for submission - with detailed checks
  const isFormValid = () => {
    const hasRequiredFields =
      selectedSubstance && inputs.P1 && inputs.T1 && inputs.Hvap;
    const hasOneTarget = (inputs.P2 || inputs.T2) && !(inputs.P2 && inputs.T2);
    const noValidationErrors = Object.keys(validationErrors).length === 0;

    console.log("DEBUG - Form validation:", {
      hasRequiredFields,
      hasOneTarget,
      noValidationErrors,
      selectedSubstance,
      P1: inputs.P1,
      T1: inputs.T1,
      Hvap: inputs.Hvap,
      P2: inputs.P2,
      T2: inputs.T2,
      validationErrors,
    });

    return hasRequiredFields && hasOneTarget && noValidationErrors;
  };

  return (
    <div className="w-full bg-gradient-to-br from-orange-50/50 via-red-50/30 to-amber-50/20 border border-white/50 overflow-hidden backdrop-blur-sm mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-2 lg:px-4 xl:px-6">
      {/* Header */}
      <BoilingPointHeader BoilIcon={BoilIcon} />

      <div className="p-2 sm:p-3 lg:p-4">
        {/* Substance Selection */}
        <SubstanceSelector
          selectedSubstance={selectedSubstance}
          selectedSubstanceData={selectedSubstanceData}
          isSubstanceOpen={isSubstanceOpen}
          groupedSubstances={groupedSubstances}
          onSubstanceChange={handleSubstanceChange}
          onToggleDropdown={toggleSubstanceDropdown}
          validationErrors={validationErrors}
        />

        {/* Input Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Known Values Card */}
          <InputCard
            title="Known Values"
            subtitle="Reference boiling point data"
            icon={Thermometer}
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
            fields={knownValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-orange-500"
          />

          <InputCard
            title="Find Unknown"
            subtitle="Enter one value to calculate the other"
            icon={Gauge}
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
            fields={targetValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-red-500"
            showHelperText={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Clear Button */}
          <button
            onClick={clearAll}
            className="group relative bg-white/80 backdrop-blur-sm border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 min-w-[140px]"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

            <Eraser className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-base relative z-10">Clear All</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
            className={`group relative font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 min-w-[140px] ${
              isFormValid() && !loading
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/25 hover:shadow-green-500/40 cursor-pointer border border-green-600"
                : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-400 cursor-not-allowed border border-gray-300"
            }`}
          >
            {/* Animated background shine - only when enabled */}
            {isFormValid() && !loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            )}

            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                <span className="text-base relative z-10">Calculating...</span>
              </>
            ) : (
              <>
                <Calculator
                  className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
                    isFormValid() ? "group-hover:scale-110" : ""
                  }`}
                />
                <span className="text-base relative z-10">Calculate</span>
              </>
            )}
          </button>
        </div>

        {/* Validation and Error Messages */}
        <div className="space-y-3">
          {/* Helper Text */}
          {(inputs.P2 || inputs.T2) &&
            !(inputs.P2 && inputs.T2) &&
            isFormValid() && (
              <div className="text-center p-3 bg-blue-50/80 border border-blue-200 rounded-lg backdrop-blur-sm">
                <p className="text-blue-700 text-sm font-medium">
                  💡{" "}
                  {inputs.P2
                    ? "Ready to calculate temperature (T₂) from pressure (P₂)"
                    : "Ready to calculate pressure (P₂) from temperature (T₂)"}
                </p>
              </div>
            )}

          {/* Validation Issues */}
          {/* {!isFormValid() && (
            <div className="text-center p-3 bg-red-50/80 border border-red-200 rounded-lg backdrop-blur-sm">
              <p className="text-red-700 text-sm font-medium">
                {!selectedSubstance
                  ? "Please select a substance"
                  : !inputs.P1
                  ? "Please fill Pressure (P₁)"
                  : !inputs.T1
                  ? "Please fill Temperature (T₁)"
                  : !inputs.Hvap
                  ? "Please fill Enthalpy of Vaporization (ΔHvap)"
                  : !inputs.P2 && !inputs.T2
                  ? "Please enter either P₂ or T₂"
                  : inputs.P2 && inputs.T2
                  ? "Please enter only one target value (P₂ or T₂)"
                  : Object.keys(validationErrors).length > 0
                  ? `Validation errors: ${Object.values(validationErrors).join(
                      ", "
                    )}`
                  : "Please check all required fields"}
              </p>
            </div>
          )} */}

          {/* Error Display */}
          {error && (
            <div className="text-center p-3 bg-red-50/80 border border-red-200 rounded-lg backdrop-blur-sm">
              <p className="text-red-700 text-sm font-medium">❌ {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
