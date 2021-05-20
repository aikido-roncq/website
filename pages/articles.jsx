import Article from '@/components/Article'
import Head from '@/components/layouts/Head'
import styles from '@/styles/Articles.module.scss'
import Layout from '@/components/layouts/Layout'
import Title from '@/components/Title'
import { useEffect, useState } from 'react'

import axios from 'axios'

const Articles = () => {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios
      .get('/articles')
      .then((res) => setArticles(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <Head
        title="Articles"
        description="Tous les articles de l'Académie Roncquoïse d'Aïkido."
      />

      <Title emoji="📰">Articles</Title>

      <div className={styles.container}>
        {loading ? (
          <p>Chargement des articles...</p>
        ) : articles.length > 0 ? (
          articles?.map((article) => (
            <Article {...article} key={article.slug} className={styles.article} />
          ))
        ) : (
          <p>Aucun article.</p>
        )}
      </div>
    </Layout>
  )
}

export default Articles
