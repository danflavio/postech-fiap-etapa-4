import axios from 'axios';
import { Platform } from 'react-native';

const API_PORT = process.env.EXPO_PUBLIC_API_PORT || '3010';

const getBaseURL = () => {
  if (process.env.EXPO_PUBLIC_API_HOST) {
    return `${process.env.EXPO_PUBLIC_API_HOST}:${API_PORT}`;
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${API_PORT}`;
  }

  return `http://localhost:${API_PORT}`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response || error.response.status >= 500) {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
