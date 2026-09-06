import axios from 'axios';

/**
 * Global Axios Instance for API requests.
 */
const api = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
