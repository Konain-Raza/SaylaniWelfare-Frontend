  import axios from 'axios';

  const apiClient = axios.create({
    baseURL:"http://localhost:3000",
    // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3400',
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
