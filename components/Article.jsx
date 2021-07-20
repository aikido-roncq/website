import styles from '@/styles/components/Article.module.scss';
import { formatDate } from '@/utils/date';

const Article = ({ title, content, date, ...props }) => (
  <article {...props} className={styles.article}>
    <h2 className={styles.title}>{title}</h2>
    <small className={styles.date}>Posté le {formatDate(date)}</small>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </article>
);

export default Article;
