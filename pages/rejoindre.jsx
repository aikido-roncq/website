import Head from 'next/head'
import Link from 'next/link'
import ContactForm from 'components/ContactForm'
import Map from 'components/Map'
import { MdPhone } from 'react-icons/md'
import { FaCheckCircle, FaAt, FaUserFriends } from 'react-icons/fa'
import styles from 'styles/Rejoindre.module.scss'
import Schedules from 'components/Schedules'
import Layout from 'components/layouts/Layout'

const FACEBOOK = process.env.FACEBOOK
const INSTAGRAM = process.env.INSTAGRAM
const EMAIL = process.env.EMAIL

const Rejoindre = () => {
  return (
    <Layout maxWidth={40}>
      <Head>
        <title>Nous rejoindre | Aïkido Roncq</title>
        <meta
          name="description"
          content="Envie de nous rejoindre ? Toutes les informations
          nécessaires se trouvent sur cette page : adresse, horaires,
          informations de contact..."
        />
      </Head>

      <h2 className={styles.title}>ℹ️ Informations</h2>

      <p>
        Cours d'essai <strong>gratuit</strong>! Munissez-vous de vêtements amples
        (jogging, tee-shirt...) et venez essayer gratuitement l'Aïkido (et/ou
        l'Aïkishintaïso). 🥋
      </p>

      <h2 className={styles.title}>📍 Adresse</h2>

      <p>La Source, Forum Culturel – 293 Rue de Lille, 59223 Roncq.</p>

      <Map />

      <h2 className={styles.title}>🕙 Horaires</h2>

      <Schedules />

      <h2 className={styles.title}>📲 Nous contacter</h2>

      <p>
        <MdPhone /> Tél : <Link href="tel:+33608991470">06.08.99.14.70</Link>
      </p>

      <p>
        <FaAt /> E-mail : <Link href={'mailto:' + EMAIL}>{EMAIL}</Link>
      </p>

      <p>
        <FaUserFriends /> Sur <Link href={FACEBOOK}>Facebook</Link> et{' '}
        <Link href={INSTAGRAM}>Instagram</Link>
      </p>

      <p>
        <FaCheckCircle /> Ou via le formulaire ci-dessous :
      </p>

      <ContactForm />
    </Layout>
  )
}

export default Rejoindre
