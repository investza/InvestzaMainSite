import axios from "axios";

const axiosPrivate = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🔐 Attach JWT automatically to every request
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("JwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚪 Handle expired / invalid token globally
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("JwtToken");
      window.location.href = "/adminlogin";
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
