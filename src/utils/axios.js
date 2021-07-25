import axios from 'axios';
import { TOKEN_KEY } from './constants';

const tokenInterceptor = config => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (config.admin && token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const errorInterceptor = error => {
  if (error.response?.status === 401) {
    window.dispatchEvent(new Event('logout'));
  }
  return Promise.reject(error);
};

axios.defaults.baseURL = process.env.API_URL;
axios.interceptors.request.use(tokenInterceptor);
axios.interceptors.response.use(null, errorInterceptor);
