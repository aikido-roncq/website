import NextHead from 'next/head'

const Head = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

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

    <title>Académie Roncquoïse d'Aïkido</title>
  </NextHead>
)

export default Head
