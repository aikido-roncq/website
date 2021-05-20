import styles from '@/styles/components/Article.module.scss'
import strftime from 'strftime'

const Article = ({ title, content, date, ...props }) => {
  const dateStr = strftime('%d/%m/%Y', new Date(date))

  return (
    <article {...props} className={styles.article}>
      <h2 className={styles.title}>{title}</h2>
      <small className={styles.date}>Posté le {dateStr}</small>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </article>
  )
}

export default Article
