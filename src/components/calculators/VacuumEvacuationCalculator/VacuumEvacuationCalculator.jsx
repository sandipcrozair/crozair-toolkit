import React from "react";
import { useVacuumEvacuationCalculator } from "../../../hooks/useVacuumEvacuationCalculator";
import { VacuumHeader } from "./VacuumHeader";
import { MethodSelector } from "./MethodSelector";
import { InputField } from "./InputField";
import { CalculateButton } from "./CalculateButton";
import { ErrorDisplay } from "./ErrorDisplay";
import { ExamplesSection } from "./ExamplesSection";
import { VacuumResults } from "./VacuumResults";

const VacuumEvacuationCalculator = () => {
  const {
    // State
    method,
    inputs,
    results,
    error,
    loading,
    examples,

    // Functions
    setMethod,
    handleInputChange,
    handleUnitChange,
    calculateEvacuation,
    clearField,
    loadExample,
    getInterpretationText,
    getCalculationTitle,
    getCalculationDescription,
    getUnitLabel,
    getResultValueForUnit,
    formatValue,
    formatTime,
  } = useVacuumEvacuationCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="mx-auto">
        {/* Header */}
        <VacuumHeader />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Input Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/60 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  Input Parameters
                </h2>
              </div>

              {/* Method Selection */}
              {/* <MethodSelector method={method} setMethod={setMethod} /> */}

              {/* Input Grid */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {/* Volume Input */}
                <InputField
                  label="Chamber Volume (V)"
                  field="V"
                  unitField="V_unit"
                  value={inputs.V}
                  unit={inputs.V_unit}
                  onInputChange={handleInputChange}
                  onUnitChange={handleUnitChange}
                  onClearField={clearField}
                />

                {/* Flow Rate Input */}
                <InputField
                  label="Pump Flow Rate (q)"
                  field="q"
                  unitField="q_unit"
                  value={inputs.q}
                  unit={inputs.q_unit}
                  onInputChange={handleInputChange}
                  onUnitChange={handleUnitChange}
                  onClearField={clearField}
                />

                {/* Pressure Inputs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <InputField
                    label="Start Pressure (P₀)"
                    field="p0"
                    unitField="p0_unit"
                    value={inputs.p0}
                    unit={inputs.p0_unit}
                    onInputChange={handleInputChange}
                    onUnitChange={handleUnitChange}
                    onClearField={clearField}
                    helperText="Atmospheric pressure (typically 1000 mbar, 760 mmHg, 14.7 psi)"
                  />

                  <InputField
                    label="Target Vacuum (P₁)"
                    field="p1"
                    unitField="p1_unit"
                    value={inputs.p1}
                    unit={inputs.p1_unit}
                    onInputChange={handleInputChange}
                    onUnitChange={handleUnitChange}
                    onClearField={clearField}
                  />
                </div>

                {/* Time Input */}
                <InputField
                  label="Evacuation Time (t)"
                  field="t"
                  unitField="t_unit"
                  value={inputs.t}
                  unit={inputs.t_unit}
                  onInputChange={handleInputChange}
                  onUnitChange={handleUnitChange}
                  onClearField={clearField}
                />
              </div>

              {/* Calculate Button */}
              <CalculateButton
                loading={loading}
                onClick={calculateEvacuation}
              />

              {/* Error Display */}
              <ErrorDisplay error={error} />

              {/* Instruction */}
              <div className="mt-4 p-3 bg-blue-50/80 border border-blue-200 rounded-lg sm:rounded-xl">
                <p className="text-xs text-blue-700 text-center">
                  💡 <strong>Tip:</strong> Fill any 4 fields and leave one empty
                  to calculate it. Values will automatically convert when
                  changing units.
                </p>
              </div>
            </div>

            {/* Examples Section */}
            <ExamplesSection examples={examples} onLoadExample={loadExample} />
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-white/60 p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Calculation Result
              </h2>
            </div>

            <VacuumResults
              results={results}
              inputs={inputs}
              getInterpretationText={getInterpretationText}
              getCalculationTitle={getCalculationTitle}
              getCalculationDescription={getCalculationDescription}
              getUnitLabel={getUnitLabel}
              getResultValueForUnit={getResultValueForUnit}
              formatValue={formatValue}
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacuumEvacuationCalculator;
