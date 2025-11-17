import React from "react";

export function VacuumResults({
  results,
  inputs,
  getInterpretationText,
  getCalculationTitle,
  getCalculationDescription,
  getUnitLabel,
  getResultValueForUnit,
  formatValue,
  formatTime,
}) {
  if (!results) {
    return <EmptyResultsState />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Result Card */}
      <div className="text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl text-white">
        <div className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3 uppercase tracking-widest font-semibold">
          {getCalculationTitle(results.calculated_field)}
        </div>
        {getResultDisplay(
          results,
          inputs,
          getResultValueForUnit,
          formatValue,
          getUnitLabel,
          formatTime
        )}
        <div className="text-xs sm:text-sm opacity-90 mt-3">
          {getCalculationDescription(results.calculated_field)}
        </div>
      </div>

      {/* Input Summary */}
      <InputSummary inputs={inputs} getUnitLabel={getUnitLabel} />

      {/* Formula Used */}
      <FormulaSection results={results} />

      {/* Quick Interpretation */}
      <InterpretationSection
        results={results}
        getInterpretationText={getInterpretationText}
      />
    </div>
  );
}

// Move the getResultDisplay function here (in the UI component)
function getResultDisplay(
  results,
  inputs,
  getResultValueForUnit,
  formatValue,
  getUnitLabel,
  formatTime
) {
  const { calculated_field, result, available_units } = results;
  const userSelectedUnit = inputs[`${calculated_field}_unit`];

  const mainValue = getResultValueForUnit(
    calculated_field,
    result,
    userSelectedUnit
  );

  switch (calculated_field) {
    case "V":
      return (
        <div className="space-y-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            {formatValue(mainValue, getUnitLabel(userSelectedUnit))}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {available_units
              .filter((unit) => unit !== userSelectedUnit)
              .slice(0, 2)
              .map((unit) => (
                <div
                  key={unit}
                  className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"
                >
                  <div className="font-bold text-lg">
                    {
                      formatValue(
                        getResultValueForUnit(calculated_field, result, unit),
                        ""
                      ).split(" ")[0]
                    }
                  </div>
                  <div className="opacity-90">{getUnitLabel(unit)}</div>
                </div>
              ))}
          </div>
        </div>
      );

    case "t":
      let timeDisplay;
      if (userSelectedUnit === "s") {
        timeDisplay = `${mainValue?.toFixed(2)} seconds`;
      } else if (userSelectedUnit === "min") {
        timeDisplay = `${mainValue?.toFixed(2)} minutes`;
      } else {
        timeDisplay = `${mainValue?.toFixed(3)} hours`;
      }

      return (
        <div className="space-y-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            {timeDisplay}
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {["s", "min", "h"]
              .filter(
                (unit) =>
                  available_units.includes(unit) && unit !== userSelectedUnit
              )
              .map((unit) => (
                <div
                  key={unit}
                  className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"
                >
                  <div className="font-bold">
                    {getResultValueForUnit(
                      calculated_field,
                      result,
                      unit
                    )?.toFixed(unit === "h" ? 3 : 2)}
                  </div>
                  <div className="opacity-90 text-xs">{getUnitLabel(unit)}</div>
                </div>
              ))}
          </div>
        </div>
      );

    case "q":
      return (
        <div className="space-y-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            {formatValue(mainValue, getUnitLabel(userSelectedUnit))}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {available_units
              .filter((unit) => unit !== userSelectedUnit)
              .slice(0, 2)
              .map((unit) => (
                <div
                  key={unit}
                  className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"
                >
                  <div className="font-bold text-lg">
                    {
                      formatValue(
                        getResultValueForUnit(calculated_field, result, unit),
                        ""
                      ).split(" ")[0]
                    }
                  </div>
                  <div className="opacity-90">{getUnitLabel(unit)}</div>
                </div>
              ))}
          </div>
        </div>
      );

    case "p0":
    case "p1":
      return (
        <div className="space-y-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            {formatValue(mainValue, getUnitLabel(userSelectedUnit))}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {available_units
              .filter((unit) => unit !== userSelectedUnit)
              .slice(0, 2)
              .map((unit) => (
                <div
                  key={unit}
                  className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"
                >
                  <div className="font-bold text-lg">
                    {
                      formatValue(
                        getResultValueForUnit(calculated_field, result, unit),
                        ""
                      ).split(" ")[0]
                    }
                  </div>
                  <div className="opacity-90">{getUnitLabel(unit)}</div>
                </div>
              ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
          Calculation Complete
        </div>
      );
  }
}

function EmptyResultsState() {
  return (
    <div className="text-center py-8 sm:py-12 text-gray-500">
      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-base sm:text-lg font-semibold text-gray-600 mb-2">
        Ready to Calculate
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        Enter any 4 out of 5 parameters and click "Calculate Missing Parameter"
      </p>
      <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl border border-blue-200/50">
        <p className="text-xs sm:text-sm text-blue-700 font-medium">
          💡 <strong>Tip:</strong> Leave one field empty to calculate it based
          on the other four parameters!
        </p>
      </div>
    </div>
  );
}

function InputSummary({ inputs, getUnitLabel }) {
  const fields = [
    { key: "V", label: "Volume" },
    { key: "q", label: "Flow Rate" },
    { key: "p0", label: "Start Pressure" },
    { key: "p1", label: "Target Vacuum" },
    { key: "t", label: "Time" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-white/60 shadow-sm">
      <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
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
        Input Summary
      </h3>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className="flex justify-between items-center py-1 sm:py-2 border-b border-gray-100"
          >
            <span className="text-gray-600">{label}:</span>
            <span className="font-semibold text-gray-800">
              {inputs[key]
                ? `${inputs[key]} ${getUnitLabel(inputs[`${key}_unit`])}`
                : "Calculated"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaSection({ results }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-blue-200/60">
      <h3 className="font-bold text-blue-800 text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Formula Used
      </h3>
      <div className="bg-white/80 rounded-lg sm:rounded-xl p-3 sm:p-4 font-mono text-center text-xs sm:text-sm border border-blue-200/50">
        {results.result.formula}
      </div>
      <p className="text-xs text-blue-700 mt-2 sm:mt-3 text-center opacity-80">
        This calculation uses the {results.method} method
      </p>
    </div>
  );
}

function InterpretationSection({ results, getInterpretationText }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-green-200/60">
      <h3 className="font-bold text-green-800 text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Interpretation
      </h3>
      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
        {getInterpretationText(results)}
      </p>
    </div>
  );
}
