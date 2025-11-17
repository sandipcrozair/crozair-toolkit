// src/api/toolsApi.js
import axiosClient from "./axiosClient";

const toolsApi = {
  getVacuumConversion: (payload) => {
    console.log("Vaccum input:", payload);
    return axiosClient.post("/vaccum-convertor/", payload);
  },

  getPressureConversion: async (payload) => {
    const response = await axiosClient.post(`/pressure-convertor/`, payload);
    return response;
  },

  // Barometric Leg Calculator
  calculateBarometricLeg: (payload) => {
    console.log("Barometric leg input:", payload);
    return axiosClient.post("/barometric-leg/", payload);
  },

  // Example: Temperature Converter
  getTemperatureConversion: ({ value, unit }) => {
    console.log("Temperature input:", value, "Unit:", unit);
    return axiosClient.get("/tools/temperature-converter", { value, unit });
  },

  // Example: Wind Speed Converter
  getWindSpeedConversion: ({ value, unit }) => {
    console.log("Wind Speed input:", value, "Unit:", unit);
    return axiosClient.get("/tools/wind-speed-converter", {
      params: { value, unit },
    });
  },

  // Add more tools here as needed
};

export default toolsApi;
