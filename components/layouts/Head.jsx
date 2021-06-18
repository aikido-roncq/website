import NextHead from 'next/head'

const BASE_URL = process.env.BASE_URL

const Head = ({ title, description }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

    {/* HTML meta */}
    <title>{title} | Aïkido Roncq</title>
    {description && <meta name="description" content={description} />}

    {/* OG meta */}
    <meta property="og:title" content={`${title} | Aïkido Roncq`} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:url" content={BASE_URL} />
    <meta property="og:image" content={`${BASE_URL}/images/katatedori.jpg`} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />

    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="icon" href="/favicon/favicon.ico" />

    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap"
    />

    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap"
    />
  </NextHead>
)

export default Head
