import axios from 'axios';
import url from './url';
const url="https://blood-donation-and-emergency-request.onrender.com";
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

export {url,api};
