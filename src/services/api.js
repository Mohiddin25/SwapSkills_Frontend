import axios from 'axios';

/**
 * Centralized Axios instance for Skill Swap
 * Connected to Deployed Render Backend: https://skillswap-gyjl.onrender.com/api
 */
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  const DEFAULT_PROD_URL = 'https://skillswap-gyjl.onrender.com/api';

  let base = envUrl && envUrl.trim() ? envUrl.trim() : DEFAULT_PROD_URL;

  // If in production mode and base is relative (e.g. /api), resolve to absolute Render backend URL
  if ((import.meta.env.PROD || import.meta.env.MODE === 'production') && !base.startsWith('http://') && !base.startsWith('https://')) {
    base = DEFAULT_PROD_URL;
  }

  // Clean trailing slashes
  base = base.replace(/\/+$/, '');

  // Append /api if missing from absolute domain URL
  if ((base.startsWith('http://') || base.startsWith('https://')) && !base.endsWith('/api') && !base.includes('/api/')) {
    base = `${base}/api`;
  }

  return base;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 45000, // 45s timeout for Render free tier spin-up
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to attach JWT token and normalize endpoint URLs
api.interceptors.request.use(
  (config) => {
    // Strip redundant leading /api if present in request path
    if (config.url && config.url.startsWith('/api/')) {
      config.url = config.url.replace(/^\/api/, '');
    }
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
    let message = error.response?.data?.message || error.message || 'An unexpected server error occurred';
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const fieldDetails = error.response.data.errors
        .map((e) => (typeof e === 'object' && e.message ? `${e.field || 'Error'}: ${e.message}` : e))
        .join('; ');
      if (fieldDetails) {
        message = `${message} (${fieldDetails})`;
      }
    }
    return Promise.reject(new Error(message));
  }
);

export default api;
