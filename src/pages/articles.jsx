import Article from '@/components/Article';
import Head from '@/components/layouts/Head';
import styles from '@/styles/Articles.module.scss';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/Title';
import { useEffect, useState } from 'react';
import ArticleService from '@/services/article.service';
import { useBoolean } from '@chakra-ui/react';
import Error from '@/components/Error';

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

      <div className={styles.container}>
        {loading ? (
          <p>Chargement des articles...</p>
        ) : articles.length > 0 ? (
          articles?.map(article => (
            <Article key={article.slug} article={article} className={styles.article} />
          ))
        ) : error ? (
          <Error>Une erreur est survenue. Veuillez réessayer plus tard.</Error>
        ) : (
          <p>Aucun article.</p>
        )}
      </div>
    </Layout>
  );
};

export default Articles;
