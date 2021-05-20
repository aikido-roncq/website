import styles from '@/styles/components/inputs/Button.module.scss'

const Button = ({ children, ...props }) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  )
}

export default Button
