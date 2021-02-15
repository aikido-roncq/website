import { useEffect, useState } from 'react'
import Head from 'next/head'

const { API_URL } = process.env

export default function Home() {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API_URL + '/articles')
      .then(res => res.json())
      .then(setArticles)
      .catch(e => setError(e.message))
  }, [])

  return (
    <>
      <Head>
        <title>Accueil | Aïkido Roncq</title>
      </Head>
      <h1>Hello</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {articles && <p>There are {articles.length} articles</p>}
      {articles.map(a => <div key={a.slug}>{a.content}</div>)}
    </>
  )
}
