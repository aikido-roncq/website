import { useState } from 'react'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

const useToken = () => {
  const getToken = () => {
    return Cookies.get(TOKEN_KEY)
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (localToken) => {
    Cookies.set(TOKEN_KEY, localToken, { expires: 7 })
    setToken(localToken)
  }

  const clearToken = () => {
    Cookies.remove(TOKEN_KEY)
    setToken(null)
  }

  return { token, saveToken, clearToken }
}

export default useToken
