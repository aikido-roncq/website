import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

const useToken = () => {
  const [token, setToken] = useState()

  const getToken = () => {
    return Cookies.get(TOKEN_KEY)
  }

  const saveToken = (localToken) => {
    Cookies.set(TOKEN_KEY, localToken, { expires: 7 })
    setToken(localToken)
  }

  const clearToken = () => {
    Cookies.remove(TOKEN_KEY)
    setToken(null)
  }

  useEffect(() => {
    setToken(getToken())
  }, [])

  return { token, setToken: saveToken, clearToken }
}

export default useToken
