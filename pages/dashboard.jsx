import Admin from '@/components/Admin'
import Button from '@/components/inputs/Button'
import useToken from '@/hooks/useToken'

const Dashboard = () => {
  const { token, clearToken } = useToken()

  return (
    <Admin token={token}>
      <h1>Dashboard</h1>
      <Button onClick={clearToken}>Déconnexion</Button>
    </Admin>
  )
}

export default Dashboard
