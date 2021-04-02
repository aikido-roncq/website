import { IconContext } from 'react-icons'

const AppContext = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: 'icon' }}>{children}</IconContext.Provider>
  )
}

export default AppContext
