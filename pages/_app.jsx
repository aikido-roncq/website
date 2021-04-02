import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'
import Navbar from 'components/layouts/Navbar'
import AppContext from 'components/AppContext'
import Head from 'next/head'
import 'styles/globals.scss'
import { useRouter } from 'next/router'
import NotFound from './404'

const FONTS = [
  'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=Carter+One&display=swap',
]

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />

        <link rel="icon" href="/favicon/favicon.ico" />

        {FONTS.map((font) => (
          <link key={font} href={font} rel="stylesheet" />
        ))}

        <title>Académie Roncquoïse d'Aïkido</title>
      </Head>

      {useRouter().pathname == '/404' ? (
        <NotFound />
      ) : (
        <>
          <Header />
          <AppContext>
            <div className="container">
              <Navbar />
              <main>
                <Component {...pageProps} />
              </main>
            </div>
            <Footer />
          </AppContext>
        </>
      )}
    </>
  )
}

export default App
