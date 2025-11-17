// src/api/toolsApi.js
import axiosClient from "./axiosClient";

const toolsApi = {
  // ----------------------------
  // Vacuum Conversion
  // ----------------------------
  getVacuumConversion: async (payload) => {
    try {
      console.log("Vacuum input:", payload);
      const res = await axiosClient.post("/vaccum-convertor/", payload);
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // ----------------------------
  // Pressure Conversion
  // ----------------------------
  getPressureConversion: async (payload) => {
    try {
      console.log("Pressure input:", payload);
      const res = await axiosClient.post("/pressure-convertor/", payload);
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // ----------------------------
  // Barometric Leg Calculator
  // ----------------------------
  calculateBarometricLeg: async (payload) => {
    try {
      console.log("Barometric leg input:", payload);
      const res = await axiosClient.post("/barometric-leg/", payload);
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // ----------------------------
  // Temperature Converter
  // ----------------------------
  getTemperatureConversion: async ({ value, unit }) => {
    try {
      console.log("Temperature input:", value, unit);
      const res = await axiosClient.get("/tools/temperature-converter", {
        params: { value, unit },
      });
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // ----------------------------
  // Wind Speed Converter
  // ----------------------------
  getWindSpeedConversion: async ({ value, unit }) => {
    try {
      console.log("Wind Speed input:", value, unit);
      const res = await axiosClient.get("/tools/wind-speed-converter", {
        params: { value, unit },
      });
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default toolsApi;

// ------------------------------------------------
// Global API Error Handling (Handles 502 Correctly)
// ------------------------------------------------
function handleApiError(error) {
  console.error("API Error:", error);

  if (error.response) {
    const status = error.response.status;

    // Custom handling for 502
    if (status === 502) {
      return {
        success: false,
        error: "Server error (502 Bad Gateway). Please try again.",
      };
    }

    return {
      success: false,
      error: error.response.data?.message || "Something went wrong.",
      status,
    };
  }

  // Network / CORS / server unreachable
  if (error.request) {
    return {
      success: false,
      error: "Network error — cannot reach server.",
    };
  }

  // Unexpected error
  return {
    success: false,
    error: "Unexpected error occurred.",
  };
}
