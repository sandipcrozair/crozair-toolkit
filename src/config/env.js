// Simple environment configuration
export const env = {
  // API
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",

  // Development flags
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export default env;
