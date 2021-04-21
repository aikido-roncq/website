import { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Article from 'components/Article'
import Event from 'components/Event'
import Link from 'components/Link'
import Schedules from 'components/Schedules'
import axios from 'axios'
import styles from 'styles/Index.module.scss'
import Layout from 'components/layouts/Layout'
import Title from 'components/Title'
import Head from 'components/layouts/Head'

const FACEBOOK = process.env.FACEBOOK
const INSTAGRAM = process.env.INSTAGRAM

export default function Home() {
  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res) => setArticles(res.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setArticlesLoading(false))
    axios
      .get('/events')
      .then((res) => setEvents(res.data))
      .catch(() => {})
      .finally(() => setEventsLoading(false))
  }, [])

  return (
    <Layout maxWidth={60}>
      <Head
        title="Accueil"
        description={
          "Site web officiel de l'Académie Roncquoise d'Aïkido. Soyez informés des " +
          "dernières actualités du club d'Aïkido de Roncq et des prochains évènements."
        }
      />

      <div className={styles.container}>
        <div className={styles.left}>
          <Title emoji="📰">Derniers articles</Title>
          <div className={styles.articles}>
            {articles.length ? (
              articles.map((article) => <Article key={article.slug} {...article} />)
            ) : articlesLoading ? (
              <span>Chargement des articles...</span>
            ) : (
              <span>Aucun article récent.</span>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <Title emoji="👥">Réseaux sociaux</Title>
            <div className={styles.networks}>
              <div>
                <FaFacebook /> <Link href={FACEBOOK}>Facebook</Link>
              </div>
              <div>
                <FaInstagram /> <Link href={INSTAGRAM}>Instagram</Link>
              </div>
            </div>
          </div>

          <div>
            <Title emoji="🕙">Horaires</Title>
            <Schedules />
          </div>

          <div>
            <Title emoji="📅">Évènements</Title>
            {events.length ? (
              events.map((event) => <Event key={event.id} {...event} />)
            ) : eventsLoading ? (
              <span>Chargement des événements...</span>
            ) : (
              <span>Aucun événement à venir.</span>
            )}
          </div>

          <div>
            <Title emoji="🔗">Liens utiles</Title>
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
        </div>
      </div>
    </Layout>
  )
}
