import axiosClient from "./axiosClient";

// Enhanced API with error handling
const calculatorApi = {
  getElevation: async ({ lat, lon }) => {
    try {
      console.log("Latitude:", lat, "Longitude:", lon);
      const response = await axiosClient.get(
        `/elevation/?lat=${lat}&lon=${lon}`
      );
      return response;
    } catch (error) {
      console.error("Elevation API error:", error);
      throw new Error(`Failed to get elevation: ${error.message}`);
    }
  },

  calculateBoilingPoint: async (payload) => {
    try {
      const response = await axiosClient.post(
        `/boiling-point-calculator/`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Boiling point calculation error:", error);
      throw new Error(`Failed to calculate boiling point: ${error.message}`);
    }
  },

  getReynoldsNumber: async (data) => {
    try {
      const response = await axiosClient.post("/calculators/reynolds", data);
      return response;
    } catch (error) {
      console.error("Reynolds number calculation error:", error);
      throw new Error(`Failed to calculate Reynolds number: ${error.message}`);
    }
  },

  getForce: async (data) => {
    try {
      const response = await axiosClient.post("/calculators/force", data);
      return response;
    } catch (error) {
      console.error("Force calculation error:", error);
      throw new Error(`Failed to calculate force: ${error.message}`);
    }
  },

  getTorque: async (data) => {
    try {
      const response = await axiosClient.post("/calculators/torque", data);
      return response;
    } catch (error) {
      console.error("Torque calculation error:", error);
      throw new Error(`Failed to calculate torque: ${error.message}`);
    }
  },

  getWorkPower: async (data) => {
    try {
      const response = await axiosClient.post("/calculators/work-power", data);
      return response;
    } catch (error) {
      console.error("Work/Power calculation error:", error);
      throw new Error(`Failed to calculate work/power: ${error.message}`);
    }
  },

  calculateVacuumEvacuation: async (data) => {
    try {
      // Try multiple endpoint variations
      let response;
      try {
        response = await axiosClient.post("/vacuum-evacuation-time/", data);
      } catch (firstError) {
        // Fallback to different endpoint naming
        try {
          response = await axiosClient.post("/vaccum-evacuation-time/", data);
        } catch (secondError) {
          // Final fallback
          response = await axiosClient.post("/evacuation-time/", data);
        }
      }
      return response;
    } catch (error) {
      console.error("Vacuum evacuation calculation error:", error);

      // Specific error messages based on status code
      if (error?.status === 404) {
        throw new Error("Vacuum evacuation service is currently unavailable");
      } else if (error?.status === 502) {
        throw new Error(
          "Service temporarily unavailable. Please try again later."
        );
      } else {
        throw new Error(
          `Failed to calculate vacuum evacuation time: ${error.message}`
        );
      }
    }
  },

  // Health check endpoint
  checkApiHealth: async () => {
    try {
      const response = await axiosClient.get("/health");
      return response;
    } catch (error) {
      console.error("API health check failed:", error);
      return { status: "unhealthy", error: error.message };
    }
  },
};

export default calculatorApi;
