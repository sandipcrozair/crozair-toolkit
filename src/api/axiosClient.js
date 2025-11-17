// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    // Handle different error scenarios
    if (!response) {
      // Network error
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
        data: null,
      });
    }

    const { status, data } = response;

    let errorMessage = "An unexpected error occurred";

    switch (status) {
      case 400:
        errorMessage = data?.message || "Bad request";
        break;
      case 401:
        errorMessage = "Please log in to continue";
        // Optional: redirect to login
        // window.location.href = '/login';
        break;
      case 403:
        errorMessage = "Access forbidden";
        break;
      case 404:
        errorMessage = "Requested resource not found";
        break;
      case 500:
        errorMessage = "Internal server error";
        break;
      case 502:
        errorMessage = "Service temporarily unavailable";
        break;
      case 503:
        errorMessage = "Service unavailable";
        break;
      default:
        errorMessage = data?.message || `Error ${status}`;
    }

    return Promise.reject({
      message: errorMessage,
      status: status,
      data: data,
    });
  }
);

export default axiosClient;
