import AuthContext from '@/contexts/auth-context'
import Router from 'next/router'
import { useContext, useEffect } from 'react'

const Admin = ({ children }) => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (!auth.isLoggedIn) {
      Router.push('/login')
    }
  }, [auth])

  if (!auth.isLoggedIn) {
    return null
  }

  return children
}

export default Admin
