import styles from '@/styles/components/Article.module.scss';

const Article = ({ article, ...props }) => {
  const { title, content, relativeDate } = article;
  return (
    <article {...props} className={styles.article}>
      <h2 className={styles.title}>{title}</h2>
      <small className={styles.date}>Posté {relativeDate}</small>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Article;
