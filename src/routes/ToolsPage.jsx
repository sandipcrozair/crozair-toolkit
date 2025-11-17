// ToolPage.jsx
import React, { Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentLocation } from "../hooks/getCurrentLocation";
import calculatorApi from "../api/calculatorApi";
import Loader from "../components/Loader";
import PressureConverter2 from "../components/tools/PressureConverter/PressureConverter2";
import VacuumConverter2 from "../components/tools/VaccumConvertor/VacuumConverter2";
import BarometricLegCalculator from "../components/tools/BarometricLegCalculator/BarometricLegCalculator";

const ElevationCalculator = React.lazy(() =>
  import("../components/tools/altimeter/Altimeter")
);

const ToolPage = () => {
  const { toolName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for barometric leg calculator
  const [elevationData, setElevationData] = useState(null);

  const fetchElevation = useCallback(
    async (lat, lon, triggerSource = "manual") => {
      setLoading(true);
      setError(null);
      try {
        console.log(
          `Fetching elevation - Lat: ${lat}, Lon: ${lon}, Trigger: ${triggerSource}`
        );

        let coordinates = { lat, lon };

        // If no coordinates provided, get current location with better error handling
        if (!coordinates.lat || !coordinates.lon) {
          try {
            const location = await getCurrentLocation();
            coordinates = {
              lat: parseFloat(location.lat),
              lon: parseFloat(location.lon),
            };
          } catch (locationError) {
            console.error("Location error:", locationError);
            throw new Error(
              locationError.message === "Location request timed out."
                ? "Location request timed out. Please check your GPS signal or try again."
                : "Unable to access your location. Please check location permissions."
            );
          }
        } else {
          // Ensure coordinates are numbers
          coordinates = {
            lat: parseFloat(coordinates.lat),
            lon: parseFloat(coordinates.lon),
          };
        }

        // Validate coordinates
        if (isNaN(coordinates.lat) || isNaN(coordinates.lon)) {
          throw new Error("Invalid coordinates received");
        }

        const response = await calculatorApi.getElevation({
          lat: coordinates.lat.toFixed(6),
          lon: coordinates.lon.toFixed(6),
        });

        const elevationData = {
          ...response,
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          triggerSource,
          timestamp: new Date().toISOString(),
        };

        setData(elevationData);

        // Also store elevation data for barometric leg calculator
        if (toolName?.toLowerCase() === "barometric-leg-calculator") {
          setElevationData(elevationData);
        }
      } catch (err) {
        console.error("Error fetching elevation:", err);
        const userFriendlyError = err.message.includes("timed out")
          ? "Location request timed out. Please check your GPS signal and try again."
          : err.message || "Failed to fetch elevation data";
        setError(userFriendlyError);
      } finally {
        setLoading(false);
      }
    },
    [toolName]
  );

  const handleRefresh = async () => {
    setData(null);
    setError(null);
    setLoading(true);
    try {
      const location = await getCurrentLocation();
      const coordinates = {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
      };

      const response = await calculatorApi.getElevation({
        lat: coordinates.lat.toFixed(6),
        lon: coordinates.lon.toFixed(6),
      });

      const elevationData = {
        ...response,
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        timestamp: new Date().toISOString(),
      };

      setData(elevationData);

      if (toolName?.toLowerCase() === "barometric-leg-calculator") {
        setElevationData(elevationData);
      }
    } catch (err) {
      console.error("Error refreshing elevation:", err);
      const userFriendlyError = err.message.includes("timed out")
        ? "Location request timed out. Please check your GPS signal and try again."
        : err.message || "Failed to fetch elevation data";
      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate atmospheric pressure from elevation
  const calculateAtmosphericPressureFromElevation = (elevation) => {
    if (elevation === undefined || elevation === null) {
      return {
        pressure: 29.92, // Fallback to sea level pressure
        elevation: 0,
        unit: "inHg",
      };
    }

    // Using barometric formula: P = P0 * (1 - (L * h) / T0)^(g * M / (R * L))
    const P0 = 101.325; // kPa
    const L = 0.0065; // K/m
    const T0 = 288.15; // K
    const g = 9.80665; // m/s²
    const M = 0.0289644; // kg/mol
    const R = 8.31446; // J/(mol·K)

    const exponent = (g * M) / (R * L);
    const pressureKpa = P0 * Math.pow(1 - (L * elevation) / T0, exponent);

    // Convert kPa to inHg (1 kPa = 0.2953 inHg)
    const pressureInHg = pressureKpa * 0.2953;

    return {
      pressure: pressureInHg,
      elevation: elevation,
      unit: "inHg",
    };
  };

  const renderTools = () => {
    switch (toolName?.toLowerCase()) {
      case "pressure-converter":
        return <PressureConverter2 />;
      case "vacuum-converter":
        return <VacuumConverter2 />;
      case "elevation-calculator":
        return (
          <ElevationCalculator
            fetchElevation={fetchElevation}
            data={data}
            loading={loading}
            error={error}
            onRetry={handleRefresh}
          />
        );
      case "barometric-leg-calculator":
        return (
          <BarometricLegCalculator
            fetchElevation={fetchElevation}
            elevationData={elevationData}
            loading={loading}
            error={error}
            onRetry={handleRefresh}
            calculateAtmosphericPressureFromElevation={
              calculateAtmosphericPressureFromElevation
            }
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 text-center text-xl">Tool not found.</p>
          </div>
        );
    }
  };

  return <Suspense fallback={<Loader />}>{renderTools()}</Suspense>;
};

export default ToolPage;
