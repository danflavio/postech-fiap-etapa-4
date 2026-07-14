import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_HOST}:${process.env.EXPO_PUBLIC_API_PORT}`,
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;
