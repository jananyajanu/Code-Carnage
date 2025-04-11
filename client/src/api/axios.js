import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // match your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
