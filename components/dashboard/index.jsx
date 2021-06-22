import Head from '@/components/layouts/Head'
import styles from '@/styles/Dashboard.module.scss'
import Articles from './Articles'
import Header from './Header'

const Dashboard = () => (
  <>
    <Head title="Tableau de bord" />

    <div className={styles.container}>
      <Header />
      <Articles />
    </div>
  </>
)

export default Dashboard
