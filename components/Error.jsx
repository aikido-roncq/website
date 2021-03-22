import styles from 'styles/components/Error.module.scss'
import { MdError } from 'react-icons/md'

const Error = ({ msg }) => {
  return (
    <p className={styles.error}>
      <MdError /> {msg}
    </p>
  )
}

export default Error