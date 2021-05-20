import Head from '@/components/layouts/Head'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import Map from '@/components/Map'
import { MdPhone } from 'react-icons/md'
import { FaCheckCircle, FaAt, FaUserFriends } from 'react-icons/fa'
import styles from '@/styles/Rejoindre.module.scss'
import Schedules from '@/components/Schedules'
import Layout from '@/components/layouts/Layout'
import Title from '@/components/Title'
import { FACEBOOK, INSTAGRAM, EMAIL } from '@/utils/constants'

const Rejoindre = () => {
  return (
    <Layout maxWidth={40}>
      <Head
        title="Nous rejoindre"
        description={
          'Envie de nous rejoindre ? Toutes les informations nécessaires se trouvent ' +
          'sur cette page : adresse, horaires, informations de contact...'
        }
      />

      <div className={styles.container}>
        <div>
          <Title emoji="ℹ️">Informations</Title>
          <p>
            Cours d'essai <strong>gratuit</strong>! Munissez-vous de vêtements amples
            (jogging, tee-shirt...) et venez essayer gratuitement l'Aïkido (et/ou
            l'Aïkishintaïso). 🥋
          </p>
        </div>

        <div>
          <Title emoji="📍">Adresse</Title>
          <p>La Source, Forum Culturel – 293 Rue de Lille, 59223 Roncq.</p>
          <Map />
        </div>

        <div>
          <Title emoji="🕙">Horaires</Title>
          <Schedules />
        </div>

        <div>
          <Title emoji="📲">Nous contacter</Title>
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
        </div>
      </div>
    </Layout>
  )
}

export default Rejoindre
