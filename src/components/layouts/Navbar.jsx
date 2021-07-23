import Link from '@/components/Link';
import { useRouter } from 'next/router';
import styles from '@/styles/components/Navbar.module.scss';
import { useContext } from 'react';
import AuthContext from '@/contexts/auth-context';
import AdminMenu from './AdminMenu';

const ROUTES = [
  {
    path: '/',
    label: 'Accueil',
  },
  {
    path: '/aikido',
    label: "Découvrir l'Aïkido",
  },
  {
    path: '/aikishintaiso',
    label: "Découvrir l'Aïkishintaïso",
  },
  {
    path: '/articles',
    label: 'Articles',
  },
  {
    path: '/rejoindre',
    label: 'Nous rejoindre',
  },
];

const Navbar = () => {
  const router = useRouter();
  const getClassName = route => (isActive(route) ? styles.active : '');
  const isActive = route => route === router.pathname;
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        {ROUTES.map(({ path, label }) => (
          <li className={getClassName(path)} key={path}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
        {isLoggedIn && <AdminMenu />}
      </ul>
    </nav>
  );
};

export default Navbar;
