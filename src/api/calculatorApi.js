// calculatorApi.js
import axiosClient from "./axiosClient";

const calculatorApi = {
  // ELEVATION API
  getElevation: ({ lat, lon }) =>
    axiosClient.get(`elevation/?lat=${lat}&lon=${lon}`),

  // BOILING POINT API
  calculateBoilingPoint: (payload) =>
    axiosClient.post("boiling-point-calculator/", payload),

  // VACUUM EVACUATION API
  calculateVacuumEvacuation: (payload) =>
    axiosClient.post("vaccum-evacuation-time/", payload),

  // PRESSURE CONVERTER (if needed)
  convertPressure: (payload) =>
    axiosClient.post("pressure-convertor/", payload),

  // FLOW RATE (if needed)
  calculateFlowRate: (payload) => axiosClient.post("flow-rate/", payload),

  // BAROMETRIC LEG (if needed)
  calculateBarometricLeg: (payload) =>
    axiosClient.post("barometric-leg/", payload),
};

export default calculatorApi;
