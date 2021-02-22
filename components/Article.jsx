import styles from '../styles/components/Article.module.scss'
import strftime from 'strftime'

const Article = ({ title, content, date, ...props }) => {

  const dateStr = strftime('%d/%m/%Y', new Date(date))

  return (
    <article className={styles.article} {...props}>
      <h2>{title}</h2>
      <small>Posté le {dateStr} </small>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </article>
  )
}

export default Article