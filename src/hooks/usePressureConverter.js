import { useState, useEffect, useCallback, useRef } from "react";
import toolsApi from "../api/toolsApi";
import { useDebounce } from "./useDebounce";

const allUnits = [
  "pa",
  "pascal",
  "kilopascal",
  "kpa",
  "bar",
  "psi",
  "ksi",
  "atm",
  "epa",
  "ppa",
  "tpa",
  "gpa",
  "mpa",
  "hpa",
  "dapa",
  "dpa",
  "cpa",
  "mpa_small",
  "µpa",
  "npa",
  "ppa_small",
  "fpa",
  "apa",
  "newton_per_m2",
  "newton_per_cm2",
  "newton_per_mm2",
  "kilonewton_per_m2",
  "millibar",
  "mbar",
  "microbar",
  "dyne_per_cm2",
  "kgf_per_m2",
  "kgf_per_cm2",
  "kgf_per_mm2",
  "gf_per_cm2",
  "ton_short_per_sqft",
  "ton_short_per_sqin",
  "ton_long_per_sqft",
  "ton_long_per_sqin",
  "kip_per_sqin",
  "psf",
  "psi_small",
  "poundal_per_sqft",
  "torr",
  "cmhg",
  "mmhg",
  "inhg",
  "cmh2o",
  "mmh2o",
  "inhaq",
  "ftaq",
  "at",
];

const unitLabels = {
  pa: "Pascal",
  pascal: "Pascal",
  kilopascal: "Kilopascal",
  kpa: "Kilopascal",
  bar: "Bar",
  psi: "PSI",
  ksi: "KSI",
  atm: "Atmosphere",
  epa: "Exapascal",
  ppa: "Petapascal",
  tpa: "Terapascal",
  gpa: "Gigapascal",
  mpa: "Megapascal",
  hpa: "Hectopascal",
  dapa: "Decapascal",
  dpa: "Decipascal",
  cpa: "Centipascal",
  mpa_small: "Millipascal",
  µpa: "Micropascal",
  npa: "Nanopascal",
  ppa_small: "Picopascal",
  fpa: "Femtopascal",
  apa: "Attopascal",
  newton_per_m2: "Newton per m²",
  newton_per_cm2: "Newton per cm²",
  newton_per_mm2: "Newton per mm²",
  kilonewton_per_m2: "Kilonewton per m²",
  millibar: "Millibar",
  mbar: "Millibar",
  microbar: "Microbar",
  dyne_per_cm2: "Dyne per cm²",
  kgf_per_m2: "kgf per m²",
  kgf_per_cm2: "kgf per cm²",
  kgf_per_mm2: "kgf per mm²",
  gf_per_cm2: "Gram-force per cm²",
  ton_short_per_sqft: "Ton Short per sq ft",
  ton_short_per_sqin: "Ton Short per sq in",
  ton_long_per_sqft: "Ton Long per sq ft",
  ton_long_per_sqin: "Ton Long per sq in",
  kip_per_sqin: "Kip per sq in",
  psf: "Pound per sq ft",
  psi_small: "PSI (Small)",
  poundal_per_sqft: "Poundal per sq ft",
  torr: "Torr",
  cmhg: "cm Mercury",
  mmhg: "mm Mercury",
  inhg: "Inch Mercury",
  cmh2o: "cm Water",
  mmh2o: "mm Water",
  inhaq: "Inch Water",
  ftaq: "Foot Water",
  at: "Technical Atmosphere",
};

const unitCategories = {
  "SI Units": [
    "pa",
    "pascal",
    "kilopascal",
    "kpa",
    "mpa",
    "gpa",
    "hpa",
    "epa",
    "ppa",
    "tpa",
    "dapa",
    "dpa",
    "cpa",
  ],
  "Scientific Notation": ["mpa_small", "µpa", "npa", "ppa_small", "fpa", "apa"],
  "Metric Units": ["bar", "millibar", "mbar", "microbar", "at"],
  "Imperial Pressure": ["psi", "ksi", "psf", "kip_per_sqin", "psi_small"],
  "Weight-based Imperial": [
    "ton_short_per_sqft",
    "ton_short_per_sqin",
    "ton_long_per_sqft",
    "ton_long_per_sqin",
  ],
  "Force-based Units": [
    "newton_per_m2",
    "newton_per_cm2",
    "newton_per_mm2",
    "kilonewton_per_m2",
    "dyne_per_cm2",
  ],
  "Mass-force Units": [
    "kgf_per_m2",
    "kgf_per_cm2",
    "kgf_per_mm2",
    "gf_per_cm2",
    "poundal_per_sqft",
  ],
  "Mercury Units": ["torr", "cmhg", "mmhg", "inhg"],
  "Water Column Units": ["cmh2o", "mmh2o", "inhaq", "ftaq"],
  Atmosphere: ["atm"],
};

export const usePressureConverter2 = () => {
  // State
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("pa");
  const [outputValue, setOutputValue] = useState("");
  const [outputUnit, setOutputUnit] = useState("bar");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastChanged, setLastChanged] = useState("input");

  // Refs to track previous values
  const conversionInProgress = useRef(false);
  const isInitialMount = useRef(true);

  // Debounced values for API calls
  const debouncedInputValue = useDebounce(inputValue, 800);
  const debouncedInputUnit = useDebounce(inputUnit, 500);
  const debouncedOutputValue = useDebounce(outputValue, 800);
  const debouncedOutputUnit = useDebounce(outputUnit, 500);

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

  // Get unit display name
  const getUnitDisplayName = useCallback((unit) => {
    return unitLabels[unit] || unit.replace(/_/g, " ").toUpperCase();
  }, []);

  // Convert from input to output (input-driven conversion)
  const convertFromInput = useCallback(async () => {
    if (!isValidNumber(debouncedInputValue) || conversionInProgress.current) {
      return;
    }

    try {
      conversionInProgress.current = true;
      setLoading(true);
      setError(null);

      const payload = {
        value: parseFloat(debouncedInputValue),
        from_unit: debouncedInputUnit,
        to_unit: "all",
      };

      console.log("Input conversion payload:", payload);

      const response = await toolsApi.getPressureConversion(payload);

      console.log("Input conversion response:", response);

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
      conversionInProgress.current = false;
    }
  }, [
    debouncedInputValue,
    debouncedInputUnit,
    debouncedOutputUnit,
    isValidNumber,
  ]);

  // Convert from output to input (output-driven conversion)
  const convertFromOutput = useCallback(async () => {
    if (!isValidNumber(debouncedOutputValue) || conversionInProgress.current) {
      return;
    }

    try {
      conversionInProgress.current = true;
      setLoading(true);
      setError(null);

      const payload = {
        value: parseFloat(debouncedOutputValue),
        from_unit: debouncedOutputUnit,
        to_unit: "all",
      };

      console.log("Output conversion payload:", payload);

      const response = await toolsApi.getPressureConversion(payload);

      console.log("Output conversion response:", response);

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
      conversionInProgress.current = false;
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
    if (isInitialMount.current && inputValue === "" && outputValue === "") {
      setInputValue("1");
      setLastChanged("input");
      isInitialMount.current = false;
    }
  }, [inputValue, outputValue]);

  // Handle swap units
  const handleSwapUnits = useCallback(() => {
    const tempUnit = inputUnit;
    const tempValue = inputValue;

    setInputUnit(outputUnit);
    setOutputUnit(tempUnit);

    // Only swap values if both are valid numbers
    if (isValidNumber(inputValue) && isValidNumber(outputValue)) {
      setInputValue(outputValue);
      setOutputValue(tempValue);
    } else if (isValidNumber(inputValue)) {
      // If only input is valid, keep it and convert
      setOutputValue("");
      setLastChanged("input");
    } else if (isValidNumber(outputValue)) {
      // If only output is valid, keep it and convert
      setInputValue(outputValue);
      setOutputValue("");
      setLastChanged("output");
    }

    setLastChanged("input");
  }, [inputUnit, outputUnit, inputValue, outputValue, isValidNumber]);

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
    setInputUnit("pa");
    setOutputUnit("bar");
    setOutputValue("");
    setResults([]);
    setError(null);
    setLastChanged("input");
  }, []);

  // Manual conversion trigger
  const handleConvert = useCallback(() => {
    if (isValidNumber(inputValue)) {
      setLastChanged("input");
      convertFromInput();
    } else if (isValidNumber(outputValue)) {
      setLastChanged("output");
      convertFromOutput();
    }
  }, [
    inputValue,
    outputValue,
    isValidNumber,
    convertFromInput,
    convertFromOutput,
  ]);

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
    convert: handleConvert,

    // Helper functions
    formatValue,
    getUnitDisplayName,
    isValidNumber: () =>
      isValidNumber(inputValue) || isValidNumber(outputValue),
  };
};
