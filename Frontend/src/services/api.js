import axios from 'axios';
<<<<<<< HEAD
import url from './url';
=======
const url="https://blood-donation-and-emergency-request.onrender.com";
>>>>>>> e8944991d75da7da464e3df3fe608b92c8fb5577
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
