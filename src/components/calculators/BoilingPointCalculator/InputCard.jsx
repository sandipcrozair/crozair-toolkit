import React from "react";

export function InputCard({
  title,
  subtitle,
  icon: Icon,
  gradient,
  fields,
  inputs,
  onInputChange,
  onInputFocus,
  validationErrors,
  focusColor = "focus:ring-orange-500",
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-100 hover:shadow-md sm:hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div
          className={`p-2 sm:p-3 ${gradient} rounded-xl sm:rounded-2xl shadow-lg`}
        >
          <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {fields.map(({ field, label, unit, icon: FieldIcon, iconColor }) => (
          <div key={field} className="group">
            <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg flex items-center gap-2">
              {/* <FieldIcon className={`${iconColor} w-4 h-4 sm:w-5 sm:h-5`} /> */}
              <span className="break-words">{label}</span>
              <span className="text-gray-400 font-normal ml-1 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                ({unit})
              </span>
            </label>
            <input
              type="number"
              name={field}
              value={inputs[field]}
              onChange={onInputChange}
              onFocus={onInputFocus}
              placeholder={`Enter ${label.toLowerCase()}`}
              className={`w-full border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base lg:text-lg ${focusColor} focus:border-orange-500 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:shadow-sm ${
                validationErrors[field]
                  ? "border-red-300 bg-red-50/50"
                  : "border-gray-200"
              }`}
            />
            {validationErrors[field] && (
              <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                {/* <span>⚠</span> */}
                {validationErrors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
