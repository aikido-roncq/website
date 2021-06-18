import Link from '@/components/Link'
import { FiUser } from 'react-icons/fi'
import styles from '@/styles/components/AdminMenu.module.scss'
import { FaTable } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useContext } from 'react'
import AuthContext from '@/contexts/auth-context'

const AdminMenu = () => {
  const auth = useContext(AuthContext)

  return (
    <div className={styles.container}>
      <div className={styles.admin}>
        <FiUser /> Admin
      </div>
      <div className={styles.options}>
        <div className={styles.option}>
          <Link href="/dashboard">
            <FaTable className={styles.icon} />
            Tableau de bord
          </Link>
        </div>
        <div className={styles.option} onClick={() => auth.logout()}>
          <FiLogOut className={styles.icon} />
          Déconnexion
        </div>
      </div>
    </div>
  )
}

export default AdminMenu
