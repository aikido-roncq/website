import AuthContext from '@/contexts/auth-context'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const Admin = ({ children }) => {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoggedIn) {
      const origin = encodeURI(router.asPath)
      router.push(`/login?next=${origin}`)
    }
  }, [auth])

  if (!auth.isLoggedIn) {
    return null
  }

  return children
}

export default Admin
