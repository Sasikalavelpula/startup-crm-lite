import axios from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance with base URL from environment variables, fallback to local backend port
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'startup-crm-lite-production-519a.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically inject Authorization token if available in local storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle auth expiration (401) and network failure toasts
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 1. Check for network errors (no response received from server)
    if (!error.response) {
      toast.error('Cannot connect to server. Check your connection.', {
        id: 'network-error-toast', // Prevent multiple redundant toast popups
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#FEF2F2',
          color: '#EF4444',
          border: '1px solid #FEE2E2',
        },
      });
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 2. Automatically log out user on Unauthorized (401) sessions
    if (status === 401) {
      localStorage.removeItem('crm-token');
      
      // Prevent infinite redirect loops if already on the login/register paths
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
