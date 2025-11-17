import { useState, useCallback } from "react";
import calculatorApi from "../api/calculatorApi";
import { substances } from "../constant/constant";
import { boilingPointSchema } from "../components/calculators/BoilingPointCalculator/validation/boilingPointSchema";

export function useBoilingPointCalculator() {
  const [selectedSubstance, setSelectedSubstance] = useState("");
  const [inputs, setInputs] = useState({
    P1: "",
    T1: "",
    Hvap: "",
    P2: "",
    T2: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubstanceOpen, setIsSubstanceOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Group substances by category
  const groupedSubstances = substances.reduce((acc, substance) => {
    if (!acc[substance.category]) {
      acc[substance.category] = [];
    }
    acc[substance.category].push(substance);
    return acc;
  }, {});

  const selectedSubstanceData = substances.find(
    (s) => s.name === selectedSubstance
  );

  // Real-time validation
  const validateInputs = useCallback(async (inputValues, currentSubstance) => {
    try {
      // Only validate if we have some inputs or a substance selected
      const hasInputs = Object.values(inputValues).some((val) => val !== "");
      if (!hasInputs && !currentSubstance) {
        setValidationErrors({});
        return true;
      }

      // Prepare values for validation
      const validationValues = {
        substance: currentSubstance,
        P1: inputValues.P1 === "" ? null : Number(inputValues.P1),
        T1: inputValues.T1 === "" ? null : Number(inputValues.T1),
        Hvap: inputValues.Hvap === "" ? null : Number(inputValues.Hvap),
        P2: inputValues.P2 === "" ? null : Number(inputValues.P2),
        T2: inputValues.T2 === "" ? null : Number(inputValues.T2),
      };

      await boilingPointSchema.validate(validationValues, {
        abortEarly: false,
      });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
        return false;
      }
      return false;
    }
  }, []);

  const handleSubstanceChange = useCallback(
    (substance) => {
      const newSubstance = substance.name;
      setSelectedSubstance(newSubstance);
      setIsSubstanceOpen(false);

      if (substance) {
        const newInputs = {
          ...inputs,
          Hvap: String(substance.Hvap),
        };
        setInputs(newInputs);
        validateInputs(newInputs, newSubstance);
        setResult(null);
        setError(null);
      }
    },
    [inputs, validateInputs]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Reset the dependent field when user changes P2 or T2
      let newInputs = { ...inputs, [name]: value };

      if (name === "P2" && value !== "") {
        newInputs = { ...newInputs, T2: "" }; // Reset T2 when P2 is changed
      } else if (name === "T2" && value !== "") {
        newInputs = { ...newInputs, P2: "" }; // Reset P2 when T2 is changed
      }

      setInputs(newInputs);
      validateInputs(newInputs, selectedSubstance);
      setResult(null);
      setError(null);
    },
    [inputs, selectedSubstance, validateInputs]
  );

  const handleInputFocus = useCallback((e) => {
    const { name } = e.target;
    if (name === "P2" || name === "T2") {
      setResult(null);
      setError(null);
    }
  }, []);

  // Calculate boiling point - only called when button is clicked
  const calculateBoilingPoint = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      console.log("DEBUG - Current inputs:", inputs);
      console.log("DEBUG - Selected substance:", selectedSubstance);
      console.log("DEBUG - Validation errors:", validationErrors);

      // Validate required fields with detailed logging
      if (!selectedSubstance) {
        console.log("DEBUG - Missing: substance");
        setError("Please select a substance");
        setLoading(false);
        return;
      }

      if (!inputs.P1) {
        console.log("DEBUG - Missing: P1");
        setError("Please fill Pressure (P₁)");
        setLoading(false);
        return;
      }

      if (!inputs.T1) {
        console.log("DEBUG - Missing: T1");
        setError("Please fill Temperature (T₁)");
        setLoading(false);
        return;
      }

      if (!inputs.Hvap) {
        console.log("DEBUG - Missing: Hvap");
        setError("Please fill Enthalpy of Vaporization (ΔHvap)");
        setLoading(false);
        return;
      }

      if (!inputs.P2 && !inputs.T2) {
        console.log("DEBUG - Missing: both P2 and T2");
        setError(
          "Please enter either target pressure (P₂) or target temperature (T₂)"
        );
        setLoading(false);
        return;
      }

      if (inputs.P2 && inputs.T2) {
        console.log("DEBUG - Both P2 and T2 filled:", {
          P2: inputs.P2,
          T2: inputs.T2,
        });
        setError(
          "Please enter only one target value (either P₂ or T₂), not both"
        );
        setLoading(false);
        return;
      }

      // Check if validation errors exist
      if (Object.keys(validationErrors).length > 0) {
        console.log("DEBUG - Validation errors found:", validationErrors);
        setError(
          `Please fix validation errors: ${Object.values(validationErrors).join(
            ", "
          )}`
        );
        setLoading(false);
        return;
      }

      // Validate using schema one more time to be sure
      const validationValues = {
        substance: selectedSubstance,
        P1: inputs.P1 === "" ? null : Number(inputs.P1),
        T1: inputs.T1 === "" ? null : Number(inputs.T1),
        Hvap: inputs.Hvap === "" ? null : Number(inputs.Hvap),
        P2: inputs.P2 === "" ? null : Number(inputs.P2),
        T2: inputs.T2 === "" ? null : Number(inputs.T2),
      };

      try {
        await boilingPointSchema.validate(validationValues, {
          abortEarly: false,
        });
        console.log("DEBUG - Schema validation passed");
      } catch (validationError) {
        console.log(
          "DEBUG - Schema validation failed:",
          validationError.errors
        );
        setError(`Validation error: ${validationError.errors.join(", ")}`);
        setLoading(false);
        return;
      }

      // Prepare payload
      const payload = {
        P1: parseFloat(inputs.P1),
        T1: parseFloat(inputs.T1),
        Hvap: parseFloat(inputs.Hvap),
      };

      let calculatedField = null;

      if (inputs.P2) {
        payload.P2 = parseFloat(inputs.P2);
        calculatedField = "T2";
        console.log("DEBUG - Calculating T2 from P2");
      } else if (inputs.T2) {
        payload.T2 = parseFloat(inputs.T2);
        calculatedField = "P2";
        console.log("DEBUG - Calculating P2 from T2");
      }

      console.log("DEBUG - API Payload:", payload);

      // Call API
      const response = await calculatorApi.calculateBoilingPoint(payload);
      console.log("DEBUG - API Response:", response);
      setResult(response || null);

      // Update the calculated field based on API response
      if (response && calculatedField) {
        if (calculatedField === "T2" && response.T2 !== undefined) {
          setInputs((prev) => ({
            ...prev,
            T2: String(response.T2),
          }));
          console.log("DEBUG - Updated T2 with:", response.T2);
        } else if (calculatedField === "P2" && response.P2 !== undefined) {
          setInputs((prev) => ({
            ...prev,
            P2: String(response.P2),
          }));
          console.log("DEBUG - Updated P2 with:", response.P2);
        }
      }
    } catch (err) {
      console.error("Calculation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during calculation"
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [inputs, selectedSubstance, validationErrors]);

  const clearAll = useCallback(() => {
    setSelectedSubstance("");
    setInputs({
      P1: "",
      T1: "",
      Hvap: "",
      P2: "",
      T2: "",
    });
    setResult(null);
    setError(null);
    setValidationErrors({});
    setIsSubstanceOpen(false);
  }, []);

  const toggleSubstanceDropdown = useCallback(() => {
    setIsSubstanceOpen((prev) => !prev);
  }, []);

  // Return all the state and functions that the UI needs
  return {
    // State
    selectedSubstance,
    inputs,
    result,
    loading,
    error,
    isSubstanceOpen,
    groupedSubstances,
    selectedSubstanceData,
    validationErrors,

    // Functions
    handleSubstanceChange,
    handleInputChange,
    handleInputFocus,
    clearAll,
    toggleSubstanceDropdown,
    calculateBoilingPoint,
  };
}
