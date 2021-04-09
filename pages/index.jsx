import { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Article from 'components/Article'
import Event from 'components/Event'
import Link from 'components/Link'
import Schedules from 'components/Schedules'
import Head from 'next/head'
import axios from 'axios'
import styles from 'styles/Index.module.scss'
import Layout from 'components/layouts/Layout'

const API_URL = process.env.API_URL
const FACEBOOK = process.env.FACEBOOK
const INSTAGRAM = process.env.INSTAGRAM

export default function Home() {
  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/articles`)
      .then((res) => setArticles(res.data))
      .catch(() => {})
    axios
      .get(`${API_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch(() => {})
  }, [])

  return (
    <Layout maxWidth={60}>
      <Head>
        <title>Accueil | Aïkido Roncq</title>
      </Head>
      <div className={styles.container}>
        <h2>📝 Derniers articles</h2>
        {articles.length ? (
          articles.map((a) => <Article key={a.slug} {...a} />)
        ) : (
          <span>Aucun article récent.</span>
        )}

        <h2>👥 Réseaux sociaux</h2>
        <div className={styles.networks}>
          <div>
            <FaFacebook /> <Link href={FACEBOOK}>Facebook</Link>
          </div>
          <div>
            <FaInstagram /> <Link href={INSTAGRAM}>Instagram</Link>
          </div>
        </div>

        <h2>🕙 Horaires</h2>
        <Schedules />

        <h2>📅 Évènements</h2>
        {events.length ? (
          events.map((event) => <Event key={event.id} {...event} />)
        ) : (
          <span>Aucun événement à venir.</span>
        )}

        <h2>🔗 Liens utiles</h2>

        <ul className={styles.links}>
          <li>
            <Link href="https://www.youtube.com/user/aikidoKAKKHH">
              Chaîne YouTube de la 3aKH
            </Link>
          </li>
          <li>
            <Link href="https://aikido-kobayashi.org/">Site officiel de la 3aKH</Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}
