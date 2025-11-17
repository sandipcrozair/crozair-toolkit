import axiosClient from "./axiosClient";

const calculatorApi = {
  getElevation: ({ lat, lon }) => {
    console.log("Latitude:", lat, "Longitude:", lon);
    return axiosClient.get(`/elevation/?lat=${lat}&lon=${lon}`);
  },
  calculateBoilingPoint: async (payload) => {
    const response = await axiosClient.post(
      `/boiling-point-calculator/`,
      payload
    );
    return response;
  },
  getReynoldsNumber: (data) => axiosClient.post("/calculators/reynolds", data),
  getForce: (data) => axiosClient.post("/calculators/force", data),
  getTorque: (data) => axiosClient.post("/calculators/torque", data),
  getWorkPower: (data) => axiosClient.post("/calculators/work-power", data),
  calculateVacuumEvacuation: (data) =>
    axiosClient.post("/vaccum-evacuation-time/", data),
};

export default calculatorApi;
