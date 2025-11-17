// src/api/toolsApi.js
import axiosClient from "./axiosClient";

const toolsApi = {
  getVacuumConversion: async (payload) => {
    try {
      console.log("Vacuum input:", payload);
      const response = await axiosClient.post("/vaccum-convertor/", payload);
      return response;
    } catch (error) {
      console.error("Vacuum conversion error:", error);
      throw error;
    }
  },

  getPressureConversion: async (payload) => {
    try {
      const response = await axiosClient.post("/pressure-convertor/", payload);
      return response;
    } catch (error) {
      console.error("Pressure conversion error:", error);
      throw error;
    }
  },

  calculateBarometricLeg: async (payload) => {
    try {
      console.log("Barometric leg input:", payload);
      const response = await axiosClient.post("/barometric-leg/", payload);
      return response;
    } catch (error) {
      console.error("Barometric leg calculation error:", error);
      throw error;
    }
  },

  // Add retry logic for important requests
  getVacuumConversionWithRetry: async (payload, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await toolsApi.getVacuumConversion(payload);
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        // Wait before retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, i))
        );
      }
    }
  },
};

export default toolsApi;
