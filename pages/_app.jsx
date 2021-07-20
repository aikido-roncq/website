import AppContext from '@/components/AppContext';
import '@/styles/globals.scss';
import '@/utils/axios';

const App = ({ Component, pageProps }) => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
);

export default App;
