import axios from "axios";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
  function(config){
    const token = sessionStorage.getItem('token');
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => Promise.reject(error),
)
