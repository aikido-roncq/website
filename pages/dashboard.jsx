import Admin from '@/components/Admin'
import Button from '@/components/inputs/Button'
import AuthContext from '@/contexts/auth-context'
import Head from '@/components/layouts/Head'
import { useContext } from 'react'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const auth = useContext(AuthContext)
  const router = useRouter()

  const logout = () => {
    auth.logout()
    router.push('/')
  }

  return (
    <Admin>
      <Head title="Tableau de bord" />
      <h1>Dashboard</h1>
      <Button onClick={logout}>Déconnexion</Button>
    </Admin>
  )
}

export default Dashboard
