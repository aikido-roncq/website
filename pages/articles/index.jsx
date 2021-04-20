import { FaHourglassHalf } from 'react-icons/fa'
import Article from 'components/Article'
import Head from 'next/head'
import styles from 'styles/Articles.module.scss'
import Layout from 'components/layouts/Layout'
import Title from 'components/Title'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Articles = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios
      .get('/articles')
      .then((res) => {
        setArticles(res.data)
        setLoading(false)
      })
      .catch(() => setError(true))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Articles | Aïkido Roncq</title>
      </Head>

      <Title emoji="📝">Articles</Title>

      {loading && (
        <p>
          <FaHourglassHalf /> Chargement des articles...
        </p>
      )}

      {error && <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>}

      <div className={styles.container}>
        {articles?.map((article) => (
          <Article {...article} key={article.slug} className={styles.article} />
        ))}
      </div>
    </Layout>
  )
}

export default Articles
