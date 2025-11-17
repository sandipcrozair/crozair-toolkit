import { useState, useEffect, useRef, useCallback } from "react";
import toolsApi from "../api/toolsApi";

export const useBarometricCalculator = (
  fetchElevation,
  elevationData,
  loading,
  error
  // calculateAtmosphericPressureFromElevation
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState(null);
  const [calculationMode, setCalculationMode] = useState("seaLevel");
  const [height, setHeight] = useState({ h_meters: 0, h_feet: 0 });
  const [pressure, setPressure] = useState(101325);
  const [localLoading, setLocalLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [currentDensity, setCurrentDensity] = useState(1000);
  const watchId = useRef(null);

  // Calculate at sea level - USING API CALL
  const handleSeaLevelCalculation = useCallback(async (density = 1000) => {
    setLocalLoading(true);
    setCalculationMode("seaLevel");
    setLocationError(null);
    setCurrentDensity(density);

    try {
      console.log(
        "Calling calculateBarometricLeg API for sea level with density:",
        density
      );

      const response = await toolsApi.calculateBarometricLeg({
        rho: density,
      });

      console.log("Sea level API response:", response);

      // Handle API response based on the structure you provided
      const result = response.data || response;

      if (result && result.result) {
        // Handle the response structure from your example
        const heightData = result.result;
        setHeight({
          h_meters: heightData.h_meters || 0,
          h_feet: heightData.h_feet || 0,
        });
        setPressure(result.input?.computed_pressure || 101325);
      } else if (
        result &&
        (result.h_meters !== undefined || result.height !== undefined)
      ) {
        // Alternative response structure
        const heightValue = result.h_meters || result.height || 0;
        setHeight({
          h_meters: heightValue,
          h_feet: result.h_feet || heightValue * 3.28084,
        });
        setPressure(result.pressure || 101325);
      } else {
        // Fallback calculation
        console.warn(
          "Unexpected API response structure, using fallback calculation"
        );
        const h_meters = 101325 / (density * 9.81);
        setHeight({
          h_meters: h_meters,
          h_feet: h_meters * 3.28084,
        });
        setPressure(101325);
      }
    } catch (err) {
      console.log("Sea level API error:", err);
      // Fallback to direct calculation if API fails
      const h_meters = 101325 / (density * 9.81);
      setHeight({
        h_meters: h_meters,
        h_feet: h_meters * 3.28084,
      });
      setPressure(101325);
      setLocationError("API temporarily unavailable. Using calculated values.");
    } finally {
      setLocalLoading(false);
    }
  }, []);

  // Calculate at current location
  const handleCurrentLocationCalculation = useCallback(
    async (density = 1000) => {
      setCalculationMode("currentLocation");
      setLocationError(null);
      setCurrentDensity(density);

      try {
        await fetchElevation(null, null, "barometric-leg");
      } catch (err) {
        console.log("Current location calculation error:", err);
        setLocationError(err.message);
        await handleSeaLevelCalculation(density);
      }
    },
    [fetchElevation, handleSeaLevelCalculation]
  );

  // Calculate with elevation data - USING PRESSURE FROM ELEVATION API
  const calculateWithElevationData = useCallback(
    async (density = 1000) => {
      if (!elevationData) return;

      setLocalLoading(true);
      setLocationError(null);
      setCurrentDensity(density);

      try {
        // Get pressure directly from elevation API response
        const pressureFromElevation =
          elevationData.pressure_pa ||
          elevationData.data?.pressure_pa ||
          101325;

        console.log(
          "Using pressure from elevation API:",
          pressureFromElevation,
          "Pa"
        );
        console.log(
          "Calling calculateBarometricLeg API with density:",
          density
        );

        // CALL THE API for current location calculation with pressure from elevation API
        const response = await toolsApi.calculateBarometricLeg({
          p: pressureFromElevation,
          rho: density,
        });

        console.log("Current location API response:", response);

        // Handle API response based on the structure you provided
        const result = response.data || response;

        if (result && result.result) {
          // Handle the response structure from your example
          const heightData = result.result;
          setHeight({
            h_meters: heightData.h_meters || 0,
            h_feet: heightData.h_feet || 0,
          });
          setPressure(result.input?.computed_pressure || pressureFromElevation);

          console.log("Height calculated:", heightData.h_meters, "meters");
        } else if (
          result &&
          (result.h_meters !== undefined || result.height !== undefined)
        ) {
          // Alternative response structure
          const heightValue = result.h_meters || result.height || 0;
          setHeight({
            h_meters: heightValue,
            h_feet: result.h_feet || heightValue * 3.28084,
          });
          setPressure(result.pressure || pressureFromElevation);
        } else {
          // Fallback calculation using pressure from elevation API
          console.warn(
            "Unexpected API response structure, using fallback calculation"
          );
          const h_meters = pressureFromElevation / (density * 9.81);
          setHeight({
            h_meters: h_meters,
            h_feet: h_meters * 3.28084,
          });
          setPressure(pressureFromElevation);
        }

        // Update last coordinates with data from elevation API
        if (elevationData.latitude && elevationData.longitude) {
          setLastCoordinates({
            lat: parseFloat(elevationData.latitude),
            lon: parseFloat(elevationData.longitude),
            elevation:
              elevationData.elevation_m || elevationData.elevation || 0,
            pressure: pressureFromElevation,
            timestamp: elevationData.timestamp || new Date().toISOString(),
          });
        }
      } catch (err) {
        console.log("Barometric API error:", err);
        // Fallback to direct calculation using pressure from elevation API
        if (elevationData) {
          const pressureFromElevation = elevationData.pressure_pa || 101325;
          const h_meters = pressureFromElevation / (density * 9.81);
          setHeight({
            h_meters: h_meters,
            h_feet: h_meters * 3.28084,
          });
          setPressure(pressureFromElevation);
          setLocationError(
            "API call failed. Using calculated values with elevation pressure."
          );
        }
      } finally {
        setLocalLoading(false);
      }
    },
    [elevationData]
  );

  // Update calculations when elevation data changes
  useEffect(() => {
    if (elevationData && calculationMode === "currentLocation") {
      console.log(
        "Elevation data updated, triggering barometric calculation with density:",
        currentDensity
      );
      calculateWithElevationData(currentDensity);
    }
  }, [
    elevationData,
    calculationMode,
    calculateWithElevationData,
    currentDensity,
  ]);

  // Calculate on component mount with default density
  useEffect(() => {
    console.log("Initial barometric calculation with default density");
    handleSeaLevelCalculation(1000);
  }, [handleSeaLevelCalculation]);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Combined errors
  const combinedError = error || locationError;

  const isLoading = loading || localLoading;

  return {
    isVisible,
    calculationMode,
    height,
    pressure,
    isLoading,
    combinedError,
    lastCoordinates,
    handleSeaLevelCalculation,
    handleCurrentLocationCalculation,
  };
};
