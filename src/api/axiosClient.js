// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.crozair.com/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach token if exists
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// FIXED ERROR HANDLING
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      status: error.response?.status || null,
      data: error.response?.data || null,
      message: error.message,
    });
  }
);

export default axiosClient;
