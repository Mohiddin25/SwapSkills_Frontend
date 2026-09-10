import axios from 'axios';

/**
 * Centralized Axios instance for Skill Swap
 * Connected to Node.js + Express + MongoDB backend API
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to attach JWT token when backend is connected
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillswap_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to format errors and handle responses cleanly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected server error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
