import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/404.module.scss'

const NotFound = () => {
  return (
    <>
      <Head
        title="Page non trouvée"
        description="Désolé, la page que vous recherchez n'existe pas."
      />

      <div className={styles.container}>
        <h1 className={styles.title}>Erreur 404</h1>
        <p>La page que vous recherchez n'existe pas. ☹️</p>
        <Link href="/">
          <a className={styles.link}>Retour à la page d'accueil</a>
        </Link>
      </div>
    </>
  )
}

export default NotFound
