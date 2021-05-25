import { useState } from 'react'
import Auth from '@/utils/auth'

const useToken = () => {
  const [token, setToken] = useState(Auth.token)

  const saveToken = (localToken) => {
    Auth.saveToken(localToken)
    setToken(localToken)
  }

  const clearToken = () => {
    Auth.clearToken()
    setToken(null)
  }

  return { token, saveToken, clearToken }
}

export default useToken
