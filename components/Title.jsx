import styles from '@/styles/components/Title.module.scss';

const Title = ({ emoji, children }) => (
  <h2 className={styles.title}>
    <span>
      {emoji} {children}
    </span>
    <span className={styles.line} />
  </h2>
);

export default Title;
