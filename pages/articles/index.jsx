import { FaHourglassHalf } from 'react-icons/fa'
import useFetch from 'hooks/useFetch'
import Article from 'components/Article'
import Head from 'next/head'
import styles from 'styles/Articles.module.scss'
import Layout from 'components/layouts/Layout'
import Title from 'components/Title'

const API_URL = process.env.API_URL

const Articles = () => {
  const { result: articles, loading, error } = useFetch(`${API_URL}/articles`)

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
