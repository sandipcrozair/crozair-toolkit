import React from "react";

export function InputField({
  label,
  field,
  unitField,
  value,
  unit,
  onInputChange,
  onUnitChange,
  onClearField,
  placeholder = "Leave empty to calculate",
  helperText,
  required = true,
}) {
  const handleSelectClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <input
            type="number"
            value={value}
            onChange={(e) => onInputChange(field, e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all duration-200"
            min="0"
            step="0.001"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={() => onClearField(field)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg font-bold"
            >
              ×
            </button>
          )}
        </div>
        <select
          value={unit}
          onChange={(e) => onUnitChange(field, unitField, e.target.value)}
          onClick={handleSelectClick}
          className="w-full sm:w-28 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 text-sm sm:text-base"
        >
          {getUnitOptions(field)}
        </select>
      </div>
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
}

function getUnitOptions(field) {
  switch (field) {
    case "V":
      return (
        <>
          <option value="m3">m³</option>
          <option value="ft3">cu.ft</option>
        </>
      );
    case "q":
      return (
        <>
          <option value="m3/s">m³/s</option>
          <option value="ft3/s">cu.ft/s</option>
        </>
      );
    case "p0":
    case "p1":
      return (
        <>
          <option value="mbar">mbar</option>
          <option value="mmHg">mmHg</option>
        </>
      );
    case "t":
      return (
        <>
          <option value="s">seconds</option>
          <option value="min">minutes</option>
          <option value="h">hours</option>
        </>
      );
    default:
      return null;
  }
}
