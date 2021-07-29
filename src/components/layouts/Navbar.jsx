import Link from '@/components/Link';
import { useRouter } from 'next/router';
import styles from '@/styles/components/Navbar.module.scss';
import { useContext, useEffect, useRef } from 'react';
import AuthContext from '@/contexts/auth';
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
  const navbar = useRef();

  const handleScroll = () => {
    const offsetTop = navbar.current?.offsetTop;
    const classList = navbar.current?.classList;

    if (offsetTop > 100 && !classList.contains(styles.reduced)) {
      classList.add(styles.reduced);
    } else if (offsetTop < 20 && classList.contains(styles.reduced)) {
      classList.remove(styles.reduced);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={styles.nav} ref={navbar}>
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
