import AuthContext from '@/contexts/auth-context'
import { IconContext } from 'react-icons'
import { useAuth } from '@/hooks/useAuth'

const AppContext = ({ children }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      <IconContext.Provider value={{ className: 'icon' }}>
        {children}
      </IconContext.Provider>
    </AuthContext.Provider>
  )
}

export default AppContext
