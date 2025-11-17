import { useState, useCallback } from "react";
import calculatorApi from "../api/calculatorApi";

export function useVacuumEvacuationCalculator() {
  const [method, setMethod] = useState("logarithmic");
  const [inputs, setInputs] = useState({
    V: "",
    V_unit: "m3",
    q: "",
    q_unit: "m3/s",
    p0: "",
    p0_unit: "mbar",
    p1: "",
    p1_unit: "mbar",
    t: "",
    t_unit: "s",
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Unit conversion functions
  const convertValue = useCallback((value, fromUnit, toUnit, type) => {
    if (!value || value === "") return "";

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    const conversions = {
      volume: {
        m3: 1,
        L: 1000,
        ft3: 35.3147,
      },
      flowRate: {
        "m3/s": 1,
        "L/s": 1000,
        "ft3/s": 35.3147,
        "m3/min": 60,
        "L/min": 60000,
        "ft3/min": 2118.88,
      },
      pressure: {
        mbar: 1,
        mmHg: 0.750062,
        torr: 0.750062,
        Pa: 100,
        kPa: 0.1,
        psi: 0.0145038,
        inHg: 0.02953,
      },
      time: {
        s: 1,
        min: 1 / 60,
        h: 1 / 3600,
      },
    };

    const conversionTable = conversions[type];
    if (
      conversionTable &&
      conversionTable[fromUnit] &&
      conversionTable[toUnit]
    ) {
      const baseValue = numValue / conversionTable[fromUnit];
      return (baseValue * conversionTable[toUnit]).toString();
    }

    return value;
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleUnitChange = useCallback(
    (field, unitField, value) => {
      setInputs((prev) => {
        const currentValue = prev[field];
        const currentUnit = prev[unitField];

        if (currentValue && currentValue !== "") {
          let conversionType;
          switch (field) {
            case "V":
              conversionType = "volume";
              break;
            case "q":
              conversionType = "flowRate";
              break;
            case "p0":
            case "p1":
              conversionType = "pressure";
              break;
            case "t":
              conversionType = "time";
              break;
            default:
              conversionType = null;
          }

          if (conversionType) {
            const convertedValue = convertValue(
              currentValue,
              currentUnit,
              value,
              conversionType
            );
            return {
              ...prev,
              [field]: convertedValue,
              [unitField]: value,
            };
          }
        }

        return {
          ...prev,
          [unitField]: value,
        };
      });
    },
    [convertValue]
  );

  const preparePayload = useCallback(() => {
    const payload = {
      method: method,
    };

    if (inputs.V !== "") payload.V = parseFloat(inputs.V);
    if (inputs.q !== "") payload.q = parseFloat(inputs.q);
    if (inputs.p0 !== "") payload.p0 = parseFloat(inputs.p0);
    if (inputs.p1 !== "") payload.p1 = parseFloat(inputs.p1);
    if (inputs.t !== "") payload.t = parseFloat(inputs.t);

    payload.V_unit = inputs.V_unit;
    payload.q_unit = inputs.q_unit;
    payload.p0_unit = inputs.p0_unit;
    payload.p1_unit = inputs.p1_unit;
    payload.t_unit = inputs.t_unit;

    return payload;
  }, [inputs, method]);

  const validateInputs = useCallback(() => {
    const filledFields = [
      inputs.V !== "",
      inputs.q !== "",
      inputs.p0 !== "",
      inputs.p1 !== "",
      inputs.t !== "",
    ].filter(Boolean).length;

    if (filledFields !== 4) {
      throw new Error(
        "Please enter exactly 4 out of 5 fields (Volume, Flow Rate, Start Pressure, End Pressure, Time)"
      );
    }

    if (method === "logarithmic") {
      const p0 = parseFloat(inputs.p0);
      const p1 = parseFloat(inputs.p1);
      if (p0 <= p1 && inputs.p0 !== "" && inputs.p1 !== "") {
        throw new Error("Initial pressure must be greater than end pressure");
      }
    }

    const fieldsToCheck = ["V", "q", "p0", "p1", "t"];
    for (const field of fieldsToCheck) {
      if (inputs[field] !== "" && parseFloat(inputs[field]) <= 0) {
        throw new Error(`${field} must be greater than 0`);
      }
    }
  }, [inputs, method]);

  const getCalculationTypeFromResponse = useCallback((calculated) => {
    const calculationTypes = {
      V: "volume",
      q: "flow_rate",
      p0: "pressure_start",
      p1: "pressure_end",
      t: "time",
    };
    return calculationTypes[calculated] || "time";
  }, []);

  const getResultValueForUnit = useCallback(
    (calculatedField, result, targetUnit) => {
      switch (calculatedField) {
        case "V":
          const volumeUnits = {
            m3: result.V_m3,
            L: result.V_liter,
            ft3: result.V_ft3,
          };
          return volumeUnits[targetUnit] || result.V_m3;

        case "q":
          const flowRateUnits = {
            "m3/s": result.q_m3_s,
            "L/s": result.q_liter_s,
            "ft3/s": result.q_ft3_s,
            "m3/min": result.q_m3_min,
            "L/min": result.q_liter_min,
            "ft3/min": result.q_ft3_min,
          };
          return flowRateUnits[targetUnit] || result.q_m3_s;

        case "p0":
          const pressureUnitsP0 = {
            mbar: result.p0_mbar,
            mmHg: result.p0_mmhg,
            torr: result.p0_torr,
            Pa: result.p0_pa,
            kPa: result.p0_kpa,
            psi: result.p0_psi,
            inHg: result.p0_inhg,
          };
          return pressureUnitsP0[targetUnit] || result.p0_mbar;

        case "p1":
          const pressureUnitsP1 = {
            mbar: result.p1_mbar,
            mmHg: result.p1_mmhg,
            torr: result.p1_torr,
            Pa: result.p1_pa,
            kPa: result.p1_kpa,
            psi: result.p1_psi,
            inHg: result.p1_inhg,
          };
          return pressureUnitsP1[targetUnit] || result.p1_mbar;

        case "t":
          const timeUnits = {
            s: result.t_sec || result.t_seconds,
            min:
              result.t_min ||
              (result.t_sec ? result.t_sec / 60 : null) ||
              (result.t_seconds ? result.t_seconds / 60 : null),
            h:
              result.t_hours ||
              (result.t_sec ? result.t_sec / 3600 : null) ||
              (result.t_seconds ? result.t_seconds / 3600 : null),
          };
          return timeUnits[targetUnit] || result.t_sec || result.t_seconds;

        default:
          return 0;
      }
    },
    []
  );

  const getAvailableResultUnits = useCallback(
    (calculatedField, result) => {
      const unitMappings = {
        V: {
          m3: "V_m3",
          L: "V_liter",
          ft3: "V_ft3",
        },
        q: {
          "m3/s": "q_m3_s",
          "L/s": "q_liter_s",
          "ft3/s": "q_ft3_s",
          "m3/min": "q_m3_min",
          "L/min": "q_liter_min",
          "ft3/min": "q_ft3_min",
        },
        p0: {
          mbar: "p0_mbar",
          mmHg: "p0_mmhg",
          torr: "p0_torr",
          Pa: "p0_pa",
          kPa: "p0_kpa",
          psi: "p0_psi",
          inHg: "p0_inhg",
        },
        p1: {
          mbar: "p1_mbar",
          mmHg: "p1_mmhg",
          torr: "p1_torr",
          Pa: "p1_pa",
          kPa: "p1_kpa",
          psi: "p1_psi",
          inHg: "p1_inhg",
        },
        t: {
          s: "t_sec",
          min: "t_min",
          h: "t_hours",
        },
      };

      const availableUnits = [];
      const mapping = unitMappings[calculatedField];

      if (mapping) {
        for (const [unit, apiKey] of Object.entries(mapping)) {
          if (result[apiKey] !== undefined && result[apiKey] !== null) {
            availableUnits.push(unit);
          }
        }
      }

      return availableUnits.length > 0
        ? availableUnits
        : [inputs[`${calculatedField}_unit`]];
    },
    [inputs]
  );

  const calculateEvacuation = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      setResults(null);

      validateInputs();

      const payload = preparePayload();
      const response = await calculatorApi.calculateVacuumEvacuation(payload);
      const responseData = response;

      const calculationType = getCalculationTypeFromResponse(
        responseData.calculated
      );

      const calculatedValue = getResultValueForUnit(
        responseData.calculated,
        responseData.result,
        inputs[`${responseData.calculated}_unit`]
      );

      if (calculatedValue !== undefined && calculatedValue !== null) {
        setInputs((prev) => ({
          ...prev,
          [responseData.calculated]: calculatedValue.toString(),
        }));
      }

      setResults({
        calculation_type: calculationType,
        calculated_field: responseData.calculated,
        result: responseData.result,
        method: method,
        available_units: getAvailableResultUnits(
          responseData.calculated,
          responseData.result
        ),
        input_values: {
          V: inputs.V,
          V_unit: inputs.V_unit,
          q: inputs.q,
          q_unit: inputs.q_unit,
          p0: inputs.p0,
          p0_unit: inputs.p0_unit,
          p1: inputs.p1,
          p1_unit: inputs.p1_unit,
          t: inputs.t,
          t_unit: inputs.t_unit,
        },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Calculation failed. Please check your inputs.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [
    inputs,
    method,
    validateInputs,
    preparePayload,
    getCalculationTypeFromResponse,
    getResultValueForUnit,
    getAvailableResultUnits,
  ]);

  const clearField = useCallback(
    (field) => {
      handleInputChange(field, "");
    },
    [handleInputChange]
  );

  const examples = [
    {
      name: "Calculate Time",
      inputs: {
        V: "1",
        V_unit: "m3",
        q: "0.1",
        q_unit: "m3/s",
        p0: "1000",
        p0_unit: "mbar",
        p1: "100",
        p1_unit: "mbar",
        t: "",
        t_unit: "s",
      },
      description: "Volume: 1 m³, Flow: 0.1 m³/s, P₀: 1000 mbar, P₁: 100 mbar",
      method: "logarithmic",
    },
    {
      name: "Calculate End Pressure",
      inputs: {
        V: "1",
        V_unit: "m3",
        q: "0.1",
        q_unit: "m3/s",
        p0: "1000",
        p0_unit: "mbar",
        p1: "",
        p1_unit: "mbar",
        t: "6.9",
        t_unit: "s",
      },
      description: "Volume: 1 m³, Flow: 0.1 m³/s, P₀: 1000 mbar, Time: 6.9s",
      method: "logarithmic",
    },
    {
      name: "Calculate Volume",
      inputs: {
        V: "",
        V_unit: "m3",
        q: "0.1",
        q_unit: "m3/s",
        p0: "1000",
        p0_unit: "mbar",
        p1: "100",
        p1_unit: "mbar",
        t: "6.9",
        t_unit: "s",
      },
      description: "Flow: 0.1 m³/s, P₀: 1000 mbar, P₁: 100 mbar, Time: 6.9s",
      method: "logarithmic",
    },
    {
      name: "Calculate Flow Rate",
      inputs: {
        V: "1",
        V_unit: "m3",
        q: "",
        q_unit: "m3/s",
        p0: "1000",
        p0_unit: "mbar",
        p1: "100",
        p1_unit: "mbar",
        t: "6.9",
        t_unit: "s",
      },
      description: "Volume: 1 m³, P₀: 1000 mbar, P₁: 100 mbar, Time: 6.9s",
      method: "logarithmic",
    },
  ];

  const loadExample = useCallback((example) => {
    setInputs(example.inputs);
    setMethod(example.method);
    setResults(null);
    setError("");
  }, []);

  const formatTime = useCallback((seconds) => {
    if (seconds < 60) {
      return `${seconds.toFixed(2)} seconds`;
    } else if (seconds < 3600) {
      const minutes = seconds / 60;
      return `${minutes.toFixed(2)} minutes`;
    } else {
      const hours = seconds / 3600;
      return `${hours.toFixed(3)} hours`;
    }
  }, []);

  const formatValue = useCallback((value, unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "N/A";

    if (Math.abs(numValue) < 0.001) {
      return `${numValue.toExponential(4)} ${unit}`;
    } else if (Math.abs(numValue) < 1) {
      return `${numValue.toFixed(5)} ${unit}`;
    } else if (Math.abs(numValue) < 1000) {
      return `${numValue.toFixed(4)} ${unit}`;
    } else {
      return `${numValue.toFixed(2)} ${unit}`;
    }
  }, []);

  const getUnitLabel = useCallback((unit) => {
    const unitLabels = {
      m3: "m³",
      ft3: "ft³",
      L: "L",
      "m3/s": "m³/s",
      "ft3/s": "ft³/s",
      "L/s": "L/s",
      "m3/min": "m³/min",
      "ft3/min": "ft³/min",
      "L/min": "L/min",
      mbar: "mbar",
      mmHg: "mmHg",
      torr: "torr",
      Pa: "Pa",
      kPa: "kPa",
      psi: "psi",
      inHg: "inHg",
      s: "seconds",
      min: "minutes",
      h: "hours",
    };
    return unitLabels[unit] || unit;
  }, []);

  const getCalculationTitle = useCallback((calculatedField) => {
    const titles = {
      V: "Chamber Volume Calculated",
      q: "Pump Flow Rate Calculated",
      p0: "Start Pressure Calculated",
      p1: "End Pressure Calculated",
      t: "Evacuation Time Calculated",
    };
    return titles[calculatedField] || "Calculation Result";
  }, []);

  const getCalculationDescription = useCallback((calculatedField) => {
    const descriptions = {
      V: "Maximum chamber volume for your parameters",
      q: "Required pump flow rate for your setup",
      p0: "Initial pressure before evacuation",
      p1: "Achievable vacuum level",
      t: "Time required for complete evacuation",
    };
    return descriptions[calculatedField] || "Calculation result";
  }, []);

  // Remove the getResultDisplay function that contains JSX from the hook
  // This function should be in the UI component instead

  const getInterpretationText = useCallback(
    (results) => {
      const { calculated_field, result, input_values } = results;
      const userSelectedUnit = inputs[`${calculated_field}_unit`];
      const mainValue = getResultValueForUnit(
        calculated_field,
        result,
        userSelectedUnit
      );

      switch (calculated_field) {
        case "V":
          return `With a pump flow rate of ${input_values.q} ${getUnitLabel(
            input_values.q_unit
          )}, you can evacuate a chamber volume of ${formatValue(
            mainValue,
            getUnitLabel(userSelectedUnit)
          )} from ${input_values.p0} ${getUnitLabel(input_values.p0_unit)} to ${
            input_values.p1
          } ${getUnitLabel(input_values.p1_unit)} in ${
            input_values.t
          } ${getUnitLabel(input_values.t_unit)}.`;

        case "t":
          return `It will take approximately ${formatTime(
            result.t_sec || result.t_seconds
          ).toLowerCase()} to evacuate ${input_values.V} ${getUnitLabel(
            input_values.V_unit
          )} from ${input_values.p0} ${getUnitLabel(input_values.p0_unit)} to ${
            input_values.p1
          } ${getUnitLabel(input_values.p1_unit)} with a pump flow rate of ${
            input_values.q
          } ${getUnitLabel(input_values.q_unit)}.`;

        case "q":
          return `To evacuate ${input_values.V} ${getUnitLabel(
            input_values.V_unit
          )} from ${input_values.p0} ${getUnitLabel(input_values.p0_unit)} to ${
            input_values.p1
          } ${getUnitLabel(input_values.p1_unit)} in ${
            input_values.t
          } ${getUnitLabel(
            input_values.t_unit
          )}, you need a pump with a flow rate of ${formatValue(
            mainValue,
            getUnitLabel(userSelectedUnit)
          )}.`;

        case "p0":
          return `Starting from ${formatValue(
            mainValue,
            getUnitLabel(userSelectedUnit)
          )}, you can reach ${input_values.p1} ${getUnitLabel(
            input_values.p1_unit
          )} in ${input_values.t} ${getUnitLabel(
            input_values.t_unit
          )} with a chamber volume of ${input_values.V} ${getUnitLabel(
            input_values.V_unit
          )} and pump flow rate of ${input_values.q} ${getUnitLabel(
            input_values.q_unit
          )}.`;

        case "p1":
          return `With your current setup, you can achieve a vacuum level of ${formatValue(
            mainValue,
            getUnitLabel(userSelectedUnit)
          )} starting from ${input_values.p0} ${getUnitLabel(
            input_values.p0_unit
          )} in ${input_values.t} ${getUnitLabel(input_values.t_unit)}.`;

        default:
          return "Calculation completed successfully.";
      }
    },
    [inputs, formatValue, getUnitLabel, getResultValueForUnit, formatTime]
  );

  // Return all state and functions needed by UI
  return {
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
  };
}
