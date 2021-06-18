import { TOKEN_KEY } from '@/utils/constants'
import { useState } from 'react'
import { useEffect } from 'react'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    setToken(null)
    sessionStorage.removeItem(TOKEN_KEY)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY))
  }, [])

  useEffect(() => {
    setIsLoggedIn(token != null)

    if (token != null) {
      sessionStorage.setItem(TOKEN_KEY, token)
    }
  }, [token])

  return { token, setToken, isLoggedIn, logout }
}

export default useAuth
