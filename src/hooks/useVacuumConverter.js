import { useState, useEffect, useCallback } from "react";
import toolsApi from "../api/toolsApi";
import { useDebounce } from "./useDebounce";

const allUnits = [
  "atm",
  "pa",
  "kpa",
  "bar",
  "torr",
  "mtorr",
  "mbar",
  "inhg_abs",
  "psi_abs",
  "inh2o",
  "mmws",
  "mws",
  "psig",
  "inhg_g",
];

const unitLabels = {
  atm: "Atmosphere (atm)",
  pa: "Pascal (Pa)",
  kpa: "Kilopascal (kPa)",
  bar: "Bar",
  torr: "Torr",
  mtorr: "Millitorr",
  mbar: "Millibar",
  inhg_abs: "Inches of Mercury (abs)",
  psi_abs: "PSI (abs)",
  inh2o: "Inches of Water",
  mmws: "mm Water Column",
  mws: "Meter Water Column",
  psig: "PSI (gauge)",
  inhg_g: "Inches of Mercury (gauge)",
};

const unitCategories = {
  metric: ["pa", "kpa", "bar", "mbar"],
  imperial: ["psi_abs", "psig", "inhg_abs", "inhg_g", "inh2o"],
  scientific: ["torr", "mtorr", "atm"],
  water: ["mmws", "mws"],
};

export const useVacuumConverter = () => {
  // State
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("atm");
  const [outputValue, setOutputValue] = useState("");
  const [outputUnit, setOutputUnit] = useState("atm");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastChanged, setLastChanged] = useState("input");

  // Debounced values for API calls
  const debouncedInputValue = useDebounce(inputValue, 500);
  const debouncedInputUnit = useDebounce(inputUnit, 300);
  const debouncedOutputValue = useDebounce(outputValue, 500);
  const debouncedOutputUnit = useDebounce(outputUnit, 300);

  // Validate if a string represents a valid number
  const isValidNumber = useCallback((value) => {
    if (value === "" || value === "-" || value === "." || value === "-.") {
      return false;
    }
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  }, []);

  // Format number for display
  const formatValue = useCallback((value) => {
    if (!value || value === "" || value === "0") return "0";

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0";

    if (Math.abs(numValue) < 0.0001) return numValue.toExponential(4);
    if (Math.abs(numValue) < 0.01) return numValue.toFixed(6);
    if (Math.abs(numValue) < 1) return numValue.toFixed(4);
    if (Math.abs(numValue) < 1000) return numValue.toFixed(2);
    return numValue.toFixed(0);
  }, []);

  // Convert from input to output (input-driven conversion)
  const convertFromInput = useCallback(async () => {
    if (!isValidNumber(debouncedInputValue)) {
      setOutputValue("");
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        value: parseFloat(debouncedInputValue),
        unit: debouncedInputUnit,
        to_unit: "all",
      };

      const response = await toolsApi.getVacuumConversion(payload);

      if (response?.conversions) {
        const allResults = Object.entries(response.conversions).map(
          ([unit, value]) => ({
            unit,
            value,
          })
        );

        setResults(allResults);

        // Set output value for selected output unit
        const outputConversion = allResults.find(
          (result) => result.unit === debouncedOutputUnit
        );

        if (outputConversion) {
          setOutputValue(outputConversion.value.toString());
        }
      } else {
        setOutputValue("");
        setResults([]);
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to fetch conversion data. Please try again.");
      setOutputValue("");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedInputValue,
    debouncedInputUnit,
    debouncedOutputUnit,
    isValidNumber,
  ]);

  // Convert from output to input (output-driven conversion)
  const convertFromOutput = useCallback(async () => {
    if (!isValidNumber(debouncedOutputValue)) {
      setInputValue("");
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        value: parseFloat(debouncedOutputValue),
        unit: debouncedOutputUnit,
        to_unit: "all",
      };

      const response = await toolsApi.getVacuumConversion(payload);

      if (response?.conversions) {
        const allResults = Object.entries(response.conversions).map(
          ([unit, value]) => ({
            unit,
            value,
          })
        );

        setResults(allResults);

        // Set input value for selected input unit
        const inputConversion = allResults.find(
          (result) => result.unit === debouncedInputUnit
        );

        if (inputConversion) {
          setInputValue(inputConversion.value.toString());
        }
      } else {
        setInputValue("");
        setResults([]);
      }
    } catch (err) {
      console.error("Reverse conversion error:", err);
      setError("Failed to fetch conversion data. Please try again.");
      setInputValue("");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedOutputValue,
    debouncedOutputUnit,
    debouncedInputUnit,
    isValidNumber,
  ]);

  // Handle input value changes
  const handleInputChange = useCallback((value) => {
    // Allow empty, decimal points, negative signs during typing
    if (value === "" || value === "-" || value === "." || value === "-.") {
      setInputValue(value);
      setLastChanged("input");
      return;
    }

    // Check if it's a valid number format
    if (/^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      setLastChanged("input");
    }
  }, []);

  // Handle input unit changes
  const handleInputUnitChange = useCallback((unit) => {
    setInputUnit(unit);
    setLastChanged("input");
  }, []);

  // Handle output value changes
  const handleOutputChange = useCallback((value) => {
    // Allow empty, decimal points, negative signs during typing
    if (value === "" || value === "-" || value === "." || value === "-.") {
      setOutputValue(value);
      setLastChanged("output");
      return;
    }

    // Check if it's a valid number format
    if (/^-?\d*\.?\d*$/.test(value)) {
      setOutputValue(value);
      setLastChanged("output");
    }
  }, []);

  // Handle output unit changes
  const handleOutputUnitChange = useCallback((unit) => {
    setOutputUnit(unit);
    setLastChanged("output");
  }, []);

  // Auto-convert when input values change
  useEffect(() => {
    if (lastChanged === "input" && isValidNumber(debouncedInputValue)) {
      convertFromInput();
    } else if (lastChanged === "input" && !isValidNumber(debouncedInputValue)) {
      setOutputValue("");
      setResults([]);
    }
  }, [
    debouncedInputValue,
    debouncedInputUnit,
    lastChanged,
    convertFromInput,
    isValidNumber,
  ]);

  // Auto-convert when output values change
  useEffect(() => {
    if (lastChanged === "output" && isValidNumber(debouncedOutputValue)) {
      convertFromOutput();
    } else if (
      lastChanged === "output" &&
      !isValidNumber(debouncedOutputValue)
    ) {
      setInputValue("");
      setResults([]);
    }
  }, [
    debouncedOutputValue,
    debouncedOutputUnit,
    lastChanged,
    convertFromOutput,
    isValidNumber,
  ]);

  // Initialize with default values
  useEffect(() => {
    if (inputValue === "" && outputValue === "") {
      // setInputValue("1");
      setLastChanged("input");
    }
  }, [inputValue, outputValue]);

  // Handle swap units
  const handleSwapUnits = useCallback(() => {
    const tempUnit = inputUnit;
    const tempValue = inputValue;

    setInputUnit(outputUnit);
    setOutputUnit(tempUnit);
    setInputValue(outputValue);
    setOutputValue(tempValue);
    setLastChanged("input");
  }, [inputUnit, outputUnit, inputValue, outputValue]);

  // Clear all function
  const handleClearAll = useCallback(() => {
    setInputValue("");
    setOutputValue("");
    setResults([]);
    setError(null);
    setLastChanged("input");
  }, []);

  // Reset to initial state
  const handleReset = useCallback(() => {
    setInputValue("1");
    setInputUnit("atm");
    setOutputUnit("atm");
    setOutputValue("");
    setResults([]);
    setError(null);
    setLastChanged("input");
  }, []);

  return {
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
    setInputValue: handleInputChange,
    setInputUnit: handleInputUnitChange,
    setOutputValue: handleOutputChange,
    setOutputUnit: handleOutputUnitChange,
    swapUnits: handleSwapUnits,
    clearAll: handleClearAll,
    reset: handleReset,

    // Helper functions
    formatValue,
    isValidNumber: () =>
      isValidNumber(inputValue) || isValidNumber(outputValue),
  };
};
