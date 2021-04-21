import AppContext from 'components/AppContext'
import axios from 'axios'
import 'styles/globals.scss'

axios.defaults.baseURL = process.env.API_URL

const App = ({ Component, pageProps }) => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
)

export default App
