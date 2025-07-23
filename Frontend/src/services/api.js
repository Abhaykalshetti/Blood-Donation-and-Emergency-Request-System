import axios from 'axios';
const url="http://localhost:3000/";
const api = axios.create({
  baseURL: url,
  withCredentials: true, // for JWT cookies if used
});

// Interceptors (optional)
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
