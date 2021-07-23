import Article from '@/components/Article';
import Head from '@/components/layouts/Head';
import styles from '@/styles/Articles.module.scss';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/Title';
import { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import ArticleService from '@/services/article.service';
import { useBoolean } from '@chakra-ui/react';

const Articles = () => {
  const [loading, setLoading] = useBoolean(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useBoolean(false);

  useEffect(() => {
    ArticleService.getArticles().then(setArticles).catch(setError.on).finally(setLoading.off);
  }, []);

  return (
    <Layout>
      <Head title="Articles" description="Tous les articles de l'Académie Roncquoïse d'Aïkido." />

      <Title emoji="📰">Articles</Title>

      {error && <Alert severity="error">{error}</Alert>}

      <div className={styles.container}>
        {loading ? (
          <p>Chargement des articles...</p>
        ) : articles.length > 0 ? (
          articles?.map(article => (
            <Article key={article.slug} article={article} className={styles.article} />
          ))
        ) : error ? (
          <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>
        ) : (
          <p>Aucun article.</p>
        )}
      </div>
    </Layout>
  );
};

export default Articles;
