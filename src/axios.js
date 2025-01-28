  import axios from 'axios';

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://saylani-welfare-backend.vercel.app',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const api = {
    get: (url, params = {}, config = {}) => apiClient.get(url, { params, ...config }),
    post: (url, data, config = {}) => apiClient.post(url, data, { ...config }),
    patch: (url, data, config = {}) => apiClient.patch(url, data, { ...config }),
    delete: (url, config = {}) => apiClient.delete(url, { ...config }),
  };

  export default api;
