import AuthContext from '@/contexts/auth';
import { IconContext } from 'react-icons';
import { useAuth } from '@/hooks/useAuth';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Montserrat',
  },
});

const AppContext = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <IconContext.Provider value={{ className: 'icon' }}>
        <ChakraProvider theme={theme} resetCSS={false}>
          {children}
        </ChakraProvider>
      </IconContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppContext;
