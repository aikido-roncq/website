import Head from 'components/layouts/Head'
import AppContext from 'components/AppContext'
import { useRouter } from 'next/router'
import NotFound from './404'
import 'styles/globals.scss'

const App = ({ Component, pageProps }) => {
  const location = useRouter().pathname

  return (
    <AppContext>
      <Head />
      {location == '/404' ? <NotFound /> : <Component {...pageProps} />}
    </AppContext>
  )
}

export default App
