import axios from 'axios'
import { TOKEN_KEY } from './constants'

const tokenInterceptor = (config) => {
  const token = sessionStorage.getItem(TOKEN_KEY)

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

axios.defaults.baseURL = process.env.API_URL
axios.interceptors.request.use(tokenInterceptor)
