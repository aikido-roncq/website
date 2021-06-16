import Link from '@/components/Link'
import AuthContext from '@/contexts/auth-context'
import styles from '@/styles/components/Footer.module.scss'
import { useEffect } from 'react'
import { useContext } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaGithubAlt,
  FaAt,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { MdPowerSettingsNew } from 'react-icons/md'
import { FACEBOOK, INSTAGRAM, EMAIL } from 'utils/constants'

const links = [
  {
    href: 'https://www.github.com/iamludal',
    text: 'Site réalisé par Ludal',
    icon: <FaGithubAlt />,
  },
  {
    href: FACEBOOK,
    text: 'Facebook',
    icon: <FaFacebook />,
  },
  {
    href: INSTAGRAM,
    text: 'Instagram',
    icon: <FaInstagram />,
  },
  {
    href: 'mailto:' + EMAIL,
    text: 'Nous contacter',
    icon: <FaAt />,
  },
  {
    href: '/rejoindre',
    text: 'Nous rejoindre',
    icon: <FaMapMarkerAlt />,
  },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn) {
      links.push({
        href: '/login',
        text: 'Connexion',
        icon: <MdPowerSettingsNew />,
      })
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <ul>
        <li>Copyright © {year} Académie Roncquoise d'Aïkido</li>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              {link.icon} {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
