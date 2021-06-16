import Admin from '@/components/Admin'
import Button from '@/components/inputs/Button'
import AuthContext from '@/contexts/auth-context'
import Head from '@/components/layouts/Head'
import { useContext } from 'react'

const Dashboard = () => {
  const auth = useContext(AuthContext)

  return (
    <Admin>
      <Head title="Tableau de bord" />
      <h1>Dashboard</h1>
      <Button onClick={() => auth.logout()}>Déconnexion</Button>
    </Admin>
  )
}

export default Dashboard
