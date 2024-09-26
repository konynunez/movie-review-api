// api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "https://api.example.com",
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
