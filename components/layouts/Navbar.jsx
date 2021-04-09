import Link from 'components/Link'
import { useRouter } from 'next/router'
import styles from 'styles/components/Navbar.module.scss'

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
]

const Navbar = () => {
  const router = useRouter()
  const getClassName = (route) => (isActive(route) ? styles.active : '')
  const isActive = (route) => route == router.pathname

  return (
    <nav className={styles.nav}>
      <ul>
        {ROUTES.map(({ path, label }) => (
          <li className={getClassName(path)} key={path}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
