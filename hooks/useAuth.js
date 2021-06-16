import { TOKEN_DURATION, TOKEN_KEY } from '@/utils/constants'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export const useAuth = () => {
  const [token, setToken] = useState(Cookies.get(TOKEN_KEY))
  const [isLoggedIn, setIsLoggedIn] = useState(token != null)

  const logout = () => {
    setToken(null)
    Cookies.remove(TOKEN_KEY)
  }

  useEffect(() => {
    setIsLoggedIn(token != null)

    if (token != null) {
      Cookies.set(TOKEN_KEY, token, { expires: TOKEN_DURATION })
    }
  }, [token])

  return { token, setToken, isLoggedIn, logout }
}

export default useAuth
