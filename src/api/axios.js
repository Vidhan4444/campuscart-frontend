import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://campuscart-api.onrender.com/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

export default axiosInstance;