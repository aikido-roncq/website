import Router from 'next/router'
import { useEffect } from 'react'

const Admin = ({ token, children }) => {
  useEffect(() => {
    if (!token) {
      Router.push('/login')
    }
  })

  if (!token) {
    return null
  }

  return children
}

export default Admin
