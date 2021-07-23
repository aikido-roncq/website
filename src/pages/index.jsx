import { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Article from '@/components/Article';
import Event from '@/components/Event';
import Link from '@/components/Link';
import Schedules from '@/components/Schedules';
import axios from 'axios';
import styles from '@/styles/Index.module.scss';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/Title';
import Head from '@/components/layouts/Head';
import { FACEBOOK, INSTAGRAM } from '@/utils/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
import Image from '@/components/Image';
import 'swiper/swiper-bundle.min.css';
import Alert from '@material-ui/lab/Alert';

const API_URL = process.env.API_URL;

SwiperCore.use([Keyboard, Mousewheel, Autoplay, Pagination]);

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [articlesLoading, setArticlesLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const pagination = useRef(null);
  const [errors, setErrors] = useState({ articles: null, events: null, gallery: null });

  const removeImage = image => {
    setGallery(images => images.filter(i => i.src !== image.src));
  };

  useEffect(() => {
    axios
      .get('/articles')
      .then(res => setArticles(res.data.slice(0, 3)))
      .catch(error => {
        setErrors(e => ({ ...e, articles: 'Échec du chargement des articles' }));
        console.error(error);
      })
      .finally(() => setArticlesLoading(false));
    axios
      .get('/events')
      .then(res => setEvents(res.data))
      .catch(error => {
        setErrors(e => ({ ...e, events: 'Échec du chargement des événements' }));
        console.error(error);
      })
      .finally(() => setEventsLoading(false));
    axios
      .get('/gallery')
      .then(res => setGallery(res.data))
      .catch(error => {
        setErrors(e => ({ ...e, gallery: 'Échec du chargement de la galerie' }));
        console.error(error);
      })
      .finally(() => setGalleryLoading(false));
  }, []);

  return (
    <Layout maxWidth={70}>
      <Head
        title="Accueil"
        description={
          "Site web officiel de l'Académie Roncquoise d'Aïkido. Soyez informés des " +
          "dernières actualités du club d'Aïkido de Roncq et des prochains évènements."
        }
      />

      <div className={styles.container}>
        <div>
          <Title emoji="📰">Derniers articles</Title>
          <div className={styles.articles}>
            {articles.length ? (
              articles.map(article => <Article key={article.slug} {...article} />)
            ) : articlesLoading ? (
              <p>Chargement des articles...</p>
            ) : errors.articles ? (
              <Alert severity="error">{errors.articles}</Alert>
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
              events.map(event => <Event key={event.id} {...event} />)
            ) : eventsLoading ? (
              <p>Chargement des événements...</p>
            ) : errors.events ? (
              <Alert severity="error">{errors.events}</Alert>
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
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
            >
              {gallery.map(image => (
                <SwiperSlide key={image.src}>
                  <Image
                    src={`${API_URL}/${image.src}`}
                    caption={image.caption}
                    onError={() => removeImage(image)}
                  />
                </SwiperSlide>
              ))}
              <div className={styles.pagination} ref={pagination} />
            </Swiper>
          ) : galleryLoading ? (
            <p>Chargement de la galerie en cours...</p>
          ) : errors.gallery ? (
            <Alert severity="error">{errors.gallery}</Alert>
          ) : (
            <p>Aucune photo.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
