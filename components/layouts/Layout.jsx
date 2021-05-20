import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import styles from '@/styles/components/Layout.module.scss'

const Layout = ({ maxWidth = 45, children }) => (
  <>
    <Header />
    <div className={styles.container}>
      <Navbar />
      <main style={{ maxWidth: `${maxWidth}rem` }} className={styles.main}>
        {children}
      </main>
    </div>
    <Footer />
  </>
)

export default Layout
