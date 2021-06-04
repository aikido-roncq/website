import axios from 'axios'
import Auth from './auth'

axios.defaults.baseURL = process.env.API_URL

axios.interceptors.request.use((config) => {
  const token = Auth.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
