import classNames from 'classnames'
import styles from '../styles/components/Image.module.scss'

const Image = ({ src, caption, ...other }) => {
  return (
    <figure {...other} className={classNames(styles.figure, other.className)}>
      <img src={src} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default Image