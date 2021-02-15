import { FaHourglassHalf } from 'react-icons/fa'
import useFetch from '../../hooks/useFetch'
import Error from '../../components/Error'
import Article from '../../components/Article'
import Head from 'next/head'
import styles from '../../styles/Articles.module.scss'

const { API_URL } = process.env

const Articles = () => {

  const { result: articles, loading, error } = useFetch(API_URL + '/articles')

  return (
    <>
      <Head>
        <title>Articles | Aïkido Roncq</title>
      </Head>
      <h1 className={styles.mainTitle}>📝 Articles</h1>

      {loading && <p><FaHourglassHalf /> Chargement des articles...</p>}

      {error && <Error msg="Une erreur est survenue. Veuillez réessayer plus tard." />}

      {articles && (
        <div className={styles.articles}>
          {articles.map(article => (
            <Article {...article} key={article.slug} />
          ))}
        </div>
      )}
    </>
  )
}

export default Articles