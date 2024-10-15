// axiosInstance.js
const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080/v1', 
  timeout: 10000, // 10-second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Starting Request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;