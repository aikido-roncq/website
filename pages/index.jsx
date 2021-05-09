import { useEffect, useRef, useState } from 'react'
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
import { FACEBOOK, INSTAGRAM } from 'utils/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper'
import Image from 'components/Image'
import 'swiper/swiper-bundle.min.css'

const API_URL = process.env.API_URL

SwiperCore.use([Keyboard, Mousewheel, Autoplay, Pagination])

export default function Home() {
  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])
  const [gallery, setGallery] = useState([])

  const [articlesLoading, setArticlesLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)
  const [galleryLoading, setGalleryLoading] = useState(true)

  const pagination = useRef(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res) => setArticles(res.data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setArticlesLoading(false))
    axios
      .get('/events')
      .then((res) => setEvents(res.data))
      .catch(console.error)
      .finally(() => setEventsLoading(false))
    axios
      .get('/gallery')
      .then((res) => setGallery(res.data))
      .catch(console.error)
      .finally(() => setGalleryLoading(false))
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
              <p>Chargement des articles...</p>
            ) : (
              <p>Aucun article récent.</p>
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
              <p>Chargement des événements...</p>
            ) : (
              <p>Aucun événement à venir.</p>
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
        <div className={styles.gallery}>
          <Title emoji="📸">Galerie</Title>
          {gallery.length > 0 ? (
            <Swiper
              centeredSlides
              keyboard
              mousewheel
              pagination={{ el: pagination.current }}
              className={styles.swiper}
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
            >
              {gallery.map((image) => (
                <SwiperSlide key={image.src}>
                  <Image src={`${API_URL}/${image.src}`} caption={image.caption} />
                </SwiperSlide>
              ))}
              <div className={styles.pagination} ref={pagination}></div>
            </Swiper>
          ) : galleryLoading ? (
            <p>Chargement de la galerie en cours...</p>
          ) : (
            <p>Aucune photo.</p>
          )}
        </div>
      </div>
    </Layout>
  )
}
