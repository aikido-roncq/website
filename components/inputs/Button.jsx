import styles from '../../styles/components/inputs/Button.module.scss'

const Button = ({ ...props }) => {
  return <button className={styles.btn} {...props}></button>
}

export default Button