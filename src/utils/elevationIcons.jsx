import React from "react";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaMountain,
  FaTachometerAlt,
  FaCloud,
  FaRuler,
} from "react-icons/fa";

export const getElevationIcon = (key) => {
  const iconMappings = {
    latitude: FaMapMarkerAlt,
    longitude: FaGlobe,
    "elevation-meters": FaMountain,
    "elevation-feet": FaRuler,
    pressure: FaTachometerAlt,
    vacuum: FaCloud,
  };

  return iconMappings[key] || FaMountain;
};

export {
  FaMapMarkerAlt,
  FaGlobe,
  FaMountain,
  FaTachometerAlt,
  FaCloud,
  FaRuler,
};
