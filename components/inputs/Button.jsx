import styles from '@/styles/components/inputs/Button.module.scss'

const Button = ({ children, icon, loading = false, ...props }) => {
  return (
    <button className={styles.btn} disabled={loading} {...props}>
      {loading ? <div className={styles.loader}></div> : icon}
      {children}
    </button>
  )
}

export default Button
