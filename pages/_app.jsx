import AppContext from '@/components/AppContext'
import '@/styles/globals.scss'
import '@/utils/axios'
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './dashboard'

const App = ({ Component, pageProps }) => (
  <AppContext>
    {Component === Dashboard ? (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    ) : (
      <Component {...pageProps} />
    )}
  </AppContext>
)

export default App
