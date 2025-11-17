// src/hooks/useElevationCalculator.js
import { useState, useEffect, useRef, useCallback } from "react";

export const useElevationCalculator = (
  fetchElevation,
  data,
  loading,
  error
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState(null);
  const watchId = useRef(null);

  // Calculate distance between coordinates
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }, []);

  // Start location monitoring
  const startLocationMonitoring = useCallback(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    // Clear existing watch if any
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        console.log("Location updated:", newCoords);

        // Check if location changed significantly (more than 10 meters)
        const shouldRefetch =
          !lastCoordinates ||
          calculateDistance(
            lastCoordinates.lat,
            lastCoordinates.lon,
            newCoords.lat,
            newCoords.lon
          ) > 10;

        if (shouldRefetch) {
          console.log(
            "Significant location change detected, refetching elevation..."
          );
          setLastCoordinates(newCoords);
          fetchElevation(newCoords.lat, newCoords.lon, "location_change");
        }
      },
      (error) => {
        console.error("Location monitoring error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000, // 30 seconds
        timeout: 15000, // 15 seconds
      }
    );
  }, [lastCoordinates, calculateDistance, fetchElevation]);

  // Stop location monitoring
  const stopLocationMonitoring = useCallback(() => {
    if (watchId.current && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  // Manual refetch function
  const manualRefetch = useCallback(() => {
    console.log("Manual refetch triggered");
    if (lastCoordinates) {
      // Use last known coordinates
      fetchElevation(
        lastCoordinates.lat,
        lastCoordinates.lon,
        "manual_refetch"
      );
    } else {
      // Get fresh location
      fetchElevation(null, null, "manual_refetch_fresh");
    }
  }, [lastCoordinates, fetchElevation]);

  // Initialize location monitoring when component mounts
  useEffect(() => {
    startLocationMonitoring();

    return () => {
      stopLocationMonitoring();
    };
  }, [startLocationMonitoring, stopLocationMonitoring]);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Card data formatting
  const cardData = data
    ? [
        {
          key: "elevation",
          label: "Elevation",
          value: data.elevation?.toFixed(2),
          unit: "meters",
        },
        {
          key: "latitude",
          label: "Latitude",
          value: data.latitude?.toFixed(6),
          unit: "°",
        },
        {
          key: "longitude",
          label: "Longitude",
          value: data.longitude?.toFixed(6),
          unit: "°",
        },
      ].filter((item) => item.value !== undefined)
    : [];

  // Technical info
  const technicalInfo = data
    ? [
        {
          label: "Data Source",
          value: data.source || "Digital Elevation Model",
        },
        { label: "Accuracy", value: data.accuracy || "±3 meters" },
        { label: "Last Updated", value: new Date().toLocaleTimeString() },
        { label: "Monitoring", value: watchId.current ? "Active" : "Inactive" },
      ]
    : [];

  return {
    isVisible,
    cardData,
    technicalInfo,
    lastCoordinates,
    manualRefetch,
    startLocationMonitoring,
    stopLocationMonitoring,
    isMonitoring: !!watchId.current,
  };
};
