import Link from '@/components/Link';
import { FiLogOut, FiUser } from 'react-icons/fi';
import styles from '@/styles/components/AdminMenu.module.scss';
import { FaTable } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '@/contexts/auth-context';

const AdminMenu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <li className={styles.container}>
      <div className={styles.admin}>
        <FiUser /> Admin
      </div>
      <div className={styles.options}>
        <Link href="/dashboard" className={styles.option}>
          <FaTable className={styles.icon} />
          Tableau de bord
        </Link>
        <div className={styles.option} onClick={logout}>
          <FiLogOut className={styles.icon} />
          Déconnexion
        </div>
      </div>
    </li>
  );
};

export default AdminMenu;
