import { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Article from 'components/Article'
import Event from 'components/Event'
import Link from 'components/Link'
import Schedules from 'components/Schedules'
import Head from 'next/head'
import axios from 'axios'
import styles from 'styles/Index.module.scss'

const API_URL = process.env.API_URL
const FACEBOOK = process.env.FACEBOOK
const INSTAGRAM = process.env.INSTAGRAM

export default function Home() {

  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(API_URL + '/articles')
      .then(res => setArticles(res.data))
      .catch(e => console.log(e))
    axios.get(API_URL + '/events')
      .then(res => setEvents(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      <Head>
        <title>Accueil | Aïkido Roncq</title>
      </Head>
      <div className={styles.container}>
        <h1>📝 Derniers articles</h1>
        {articles.length ? (
          articles.map(a => <Article key={a.slug} {...a} />)
        ) : (
          <span>Aucun article récent.</span>
        )}

        <h1>👥 Réseaux sociaux</h1>
        <div className={styles.networks}>
          <div>
            <FaFacebook /> <Link href={FACEBOOK}>Facebook</Link>
          </div>
          <div>
            <FaInstagram /> <Link href={INSTAGRAM}>Instagram</Link>
          </div>
        </div>

        <h1>🕙 Horaires</h1>
        <Schedules />

        <h1>📅 Évènements</h1>
        {events.length ? (
          events.map(event => <Event key={event.id} {...event} />)
        ) : (
          <span>Aucun événement à venir.</span>
        )}

        <h1>🔗 Liens utiles</h1>

        <ul className={styles.links}>
          <li>
            <Link href="https://www.youtube.com/user/aikidoKAKKHH">
              Chaîne YouTube de la 3aKH
            </Link>
          </li>
          <li>
            <Link href="https://aikido-kobayashi.org/">
              Site officiel de la 3aKH
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
