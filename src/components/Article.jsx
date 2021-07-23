import styles from '@/styles/components/Article.module.scss';
import { relativeDateString } from '@/utils/date';

const Article = ({ title, content, date: dateStr, ...props }) => {
  const date = new Date(dateStr);
  const relativeDate = relativeDateString(date);
  return (
    <article {...props} className={styles.article}>
      <h2 className={styles.title}>{title}</h2>
      <small className={styles.date}>Posté {relativeDate}</small>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Article;
