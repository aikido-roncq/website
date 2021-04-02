import Link from 'components/Link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import styles from 'styles/components/Navbar.module.scss'
import ScrollTop from 'components/ScrollTop'

const Navbar = () => {
  const router = useRouter()

  const routes = useRef({
    '/': 'Accueil',
    '/aikido': "Découvrir l'Aïkido",
    '/aikishintaiso': "Découvrir l'Aïkishintaïso",
    '/articles': 'Articles',
    '/rejoindre': 'Nous rejoindre',
  })

  const getClassName = (route) => (isActive(route) ? styles.active : '')

  const isActive = (route) => route == router.pathname

  return (
    <nav className={styles.nav}>
      <ul>
        {Object.entries(routes.current).map(([route, text]) => (
          <li className={getClassName(route)} key={route}>
            <Link href={route}>{text}</Link>
          </li>
        ))}
      </ul>
      <ScrollTop />
    </nav>
  )
}

export default Navbar
