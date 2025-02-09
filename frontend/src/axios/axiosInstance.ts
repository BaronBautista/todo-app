import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;